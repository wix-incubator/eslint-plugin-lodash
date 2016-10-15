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
        const {isLodashWrapperMethod, getLodashContext} = require('../util/lodashUtil')
        const lodashContext = getLodashContext(context)
        const visitors = lodashContext.getImportVisitors()
        visitors.CallExpression = function(node) {
            if (lodashContext.isLodashChainStart(node) && isLodashWrapperMethod(node.arguments[0], lodashContext.version)) {
                context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name})
            }
        }
        return visitors
    }
}
