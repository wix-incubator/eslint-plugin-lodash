/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');

    function isTypeOf(node) {
        return node && node.type === 'UnaryExpression' && node.operator === 'typeof';
    }

    function isLiteral(node) {
        return node && node.type === 'Literal';
    }

    function isStrictComparison(node) {
        return (node.operator === '===' || node.operator === '!==');
    }

    function isCompareTypeOfToLiteral(node) {
        return isStrictComparison(node) &&
            ((isTypeOf(node.left) && isLiteral(node.right)) || (isTypeOf(node.right) && isLiteral(node.left)));
    }

    var REPORT_MESSAGE = 'Prefer \'_.{{method}}\' over {{actual}}.';

    return {
        BinaryExpression: function (node) {
            if (isCompareTypeOfToLiteral(node)) {
                context.report(node, REPORT_MESSAGE, {
                    method: lodashUtil.getIsTypeMethod(isLiteral(node.left) ? node.left.value : node.right.value),
                    actual: '\'typeof\' comparison'
                });
            } else if (node.operator === 'instanceof') {
                var lodashEquivalent = lodashUtil.getIsTypeMethod(node.right.name);
                if (node.right.type === 'Identifier' && lodashEquivalent) {
                    context.report(node, REPORT_MESSAGE, {method: lodashEquivalent, actual: '\'instanceof ' + node.right.name + '\''});
                }
            }
        }
    };
};
