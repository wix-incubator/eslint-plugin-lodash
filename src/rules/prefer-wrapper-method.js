/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    return {
        CallExpression(node) {
            if (lodashUtil.isLodashChainStart(node, settings.pragma) && lodashUtil.isLodashWrapperMethod(node.arguments[0], settings.version)) {
                context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name})
            }
        }
    }
}
