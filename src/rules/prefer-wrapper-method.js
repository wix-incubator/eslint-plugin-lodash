/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-wrapper-method.md'
        }
    },

    create(context) {
        const {isLodashWrapperMethod, getLodashContext} = require('../util/lodashUtil')
        const lodashContext = getLodashContext(context)
        const visitors = lodashContext.getImportVisitors()
        visitors.CallExpression = function(node) {
            if (lodashContext.isLodashChainStart(node) && isLodashWrapperMethod(node.arguments[0], lodashContext.version)) {
                context.report({node, message: 'Prefer {{name}} with wrapper method over inside the chain start.', data: {name: node.arguments[0].callee.property.name}})
            }
        }
        return visitors
    }
}
