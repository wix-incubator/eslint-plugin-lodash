/**
 * @fileoverview Rule to check if a call to _.indexOf === 0 should be a call to _.startsWith
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const astUtil = require('../util/astUtil');
    const comparisonOperators = ['==', '!=', '===', '!=='];

    function getExpressionComparedToZero(node) {
        if (comparisonOperators.indexOf(node.operator) !== -1) {
            if (node.right.value === 0) {
                return node.left;
            }
            if (node.left.value === 0) {
                return node.right;
            }
        }
    }

    function isIndexOfCall(node) {
        return astUtil.isMethodCall(node) && astUtil.getMethodName(node) === 'indexOf';
    }

    return {
        BinaryExpression(node) {
            if (isIndexOfCall(getExpressionComparedToZero(node))) {
                context.report(node, 'Prefer _.startsWith instead of comparing indexOf() to 0');
            }
        }
    }
}
