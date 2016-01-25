/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    var transformerMethods = ['reduce', 'reduceRight', 'transform'];

    function isBound(node) {
        return node && node.type === 'CallExpression' && astUtil.getMethodName(node) === 'bind' && node.arguments.length === 1;
    }

    var callExpressionReporters = {
        3: function (node, iteratee) {
            if (isBound(iteratee)) {
                context.report(iteratee.callee.property, 'Unnecessary bind, pass `thisArg` to lodash method instead');
            }
        },
        4: function (node, iteratee) {
            var isTransformerMethod = transformerMethods.some(lodashUtil.isCallToMethod.bind(null, node, settings.version));
            var iterateeIndex = node.arguments.indexOf(iteratee);
            if ((isTransformerMethod && node.arguments[iterateeIndex + 2]) || (!isTransformerMethod && node.arguments[iterateeIndex + 1])) {
                context.report(iteratee, 'Do not use Lodash 3 thisArg, use binding instead');
            }
        }
    };

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, callExpressionReporters[settings.version])
    };
};
