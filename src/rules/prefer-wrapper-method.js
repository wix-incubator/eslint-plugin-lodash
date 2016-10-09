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
        const {isLodashChainStart, isLodashWrapperMethod, getLodashImportVisitors} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const {combineVisitorObjects} = require('../util/ruleUtil')
        return combineVisitorObjects({
            CallExpression(node) {
                if (isLodashChainStart(node, settings.pragma, context) && isLodashWrapperMethod(node.arguments[0], settings.version)) {
                    context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name})
                }
            }
        }, getLodashImportVisitors(context))
    }
}
