/**
 * @fileoverview Rule to disallow using _.prototype.commit.
 */
'use strict'

/**
 * @fileoverview Rule to disallow using _.prototype.commit.
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/no-commit.md'
        }
    },

    create(context) {
        const {getLodashContext, isCallToMethod} = require('../util/lodashUtil')
        const {isMethodCall} = require('../util/astUtil')
        const lodashContext = getLodashContext(context)
        const visitors = lodashContext.getImportVisitors()
        visitors.CallExpression = function (node) {
            if (lodashContext.isLodashChainStart(node)) {
                do {
                    node = node.parent.parent
                } while (isMethodCall(node) && !isCallToMethod(node, lodashContext.version, 'commit'))
                if (isCallToMethod(node, lodashContext.version, 'commit')) {
                    context.report({node, message: 'Do not end chain with commit.'})
                }
            }
        }
        return visitors
    }
}
