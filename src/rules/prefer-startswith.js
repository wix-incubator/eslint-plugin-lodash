/**
 * @fileoverview Rule to check if a call to _.indexOf === 0 should be a call to _.startsWith
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to _.indexOf === 0 should be a call to _.startsWith
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isIndexOfCall, getExpressionComparedToInt} = require('../util/astUtil')
        return {
            BinaryExpression(node) {
                if (isIndexOfCall(getExpressionComparedToInt(node, 0))) {
                    context.report(node, 'Prefer _.startsWith instead of comparing indexOf() to 0')
                }
            }
        }
    }
}
