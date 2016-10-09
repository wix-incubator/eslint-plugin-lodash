/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict'

/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isLodashChainStart} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        function isSingleArgumentFunctionCall(node) {
            return node && node.type === 'CallExpression' && node.arguments.length === 1 && node.arguments[0].type !== 'Literal'
        }

        return {
            CallExpression(node) {
                if (isLodashChainStart(node, settings.pragma) && isSingleArgumentFunctionCall(node.arguments[0])) {
                    context.report(node, 'Prefer using thru instead of function call in chain start.')
                }
            }
        }
    }
}
