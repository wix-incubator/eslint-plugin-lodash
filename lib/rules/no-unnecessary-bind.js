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
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);

    function isBound(node) {
        return node && node.type === 'CallExpression' && astUtil.getMethodName(node) === 'bind' && node.arguments.length === 1;
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(lodashPragma, function (node, iteratee) {
            if (isBound(iteratee)) {
                context.report(iteratee.callee.property, 'Unnecessary bind, pass `thisArg` to lodash method instead');
            }
        })
    };
};
