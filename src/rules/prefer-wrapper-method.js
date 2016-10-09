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
        const {isLodashChainStart, isLodashWrapperMethod} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        return {
            CallExpression(node) {
                if (isLodashChainStart(node, settings.pragma) && isLodashWrapperMethod(node.arguments[0], settings.version)) {
                    context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name})
                }
            }
        }
    }
}
