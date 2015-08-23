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

    function isBound(node) {
        return node && node.type === 'CallExpression' && astUtil.getMethodName(node) === 'bind' && node.arguments.length === 1;
    }

    return {
        CallExpression: function (node) {
            var iteratee = lodashUtil.getLodashIteratee(node);
            if (isBound(iteratee)) {
                context.report(iteratee.callee.property, 'Unnecessary bind, pass `thisArg` to lodash method instead');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
