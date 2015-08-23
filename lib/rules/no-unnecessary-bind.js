/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');

    function isBound(node) {
        return node && node.type === 'CallExpression' && esUtil.getMethodName(node) === 'bind' && node.arguments.length === 1;
    }

    return {
        CallExpression: function (node) {
            try {
                var iteratee = esUtil.getLodashIteratee(node);
                if (isBound(iteratee)) {
                    context.report(iteratee.callee.property, 'Unnecessary bind, pass `thisArg` to lodash method instead');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
