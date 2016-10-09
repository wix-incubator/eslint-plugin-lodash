/**
 * @fileoverview Rule to check if an indexOfComparison should be a call to _.includes
 */
'use strict'

/**
 * @fileoverview Rule to check if an indexOfComparison should be a call to _.includes
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [{
            type: 'object',
            properties: {
                includeNative: {
                    type: 'boolean'
                }
            }
        }]
    },

    create(context) {
        const includeNative = context.options[0] && context.options[0].includeNative
        const {getExpressionComparedToInt, isIndexOfCall} = require('../util/astUtil')
        const {isLodashCall} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        return {
            BinaryExpression(node) {
                const callExp = getExpressionComparedToInt(node, -1, true)
                if (isIndexOfCall(callExp) && (includeNative || isLodashCall(callExp, settings.pragma))) {
                    context.report(node, 'Prefer _.includes over indexOf comparison to -1')
                }
            }
        }
    }
}