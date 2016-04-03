/**
 * @fileoverview Rule to check if an indexOfComparison should be a call to _.includes
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const includeNative = context.options[0] && context.options[0].includeNative
    const astUtil = require('../util/astUtil')
    const lodashUtil = require('../util/lodashUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    return {
        BinaryExpression(node) {
            const callExp = astUtil.getExpressionComparedToInt(node, -1, true)
            if (astUtil.isIndexOfCall(callExp) && (includeNative || lodashUtil.isLodashCall(callExp, settings.pragma))) {
                context.report(node, 'Prefer _.includes over indexOf comparison to -1')
            }
        }
    }
}

module.exports.schema = [
    {
        type: 'object',
        properties: {
            includeNative: {
                type: 'boolean'
            }
        }
    }
]