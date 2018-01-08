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
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-thru.md'
        }
    },

    create(context) {
        const {getLodashContext} = require('../util/lodashUtil')
        const lodashContext = getLodashContext(context)
        function isSingleArgumentFunctionCall(node) {
            return node && node.type === 'CallExpression' && node.arguments.length === 1 && node.arguments[0].type !== 'Literal'
        }

        const visitors = lodashContext.getImportVisitors()
        visitors.CallExpression = function (node) {
            if (lodashContext.isLodashChainStart(node) && isSingleArgumentFunctionCall(node.arguments[0])) {
                context.report({node, message: 'Prefer using thru instead of function call in chain start.'})
            }
        }
        return visitors
    }
}
