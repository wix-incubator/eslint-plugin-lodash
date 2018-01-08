/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
'use strict'

/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-lodash-chain.md'
        }
    },

    create(context) {
        const {getLodashContext, isChainBreaker, isNativeCollectionMethodCall, isLodashWrapperMethod} = require('../util/lodashUtil')
        const {isMethodCall, isObjectOfMethodCall, getMethodName} = require('../util/astUtil')
        const REPORT_MESSAGE = "Do not break chain before method '{{method}}'."
        const lodashContext = getLodashContext(context)
        const version = lodashContext.version

        const visitors = lodashContext.getImportVisitors()
        visitors.CallExpression = function(node) {
            if (lodashContext.isLodashChainStart(node)) {
                do {
                    node = node.parent.parent
                } while (isMethodCall(node) && !isChainBreaker(node, version))
                if (isChainBreaker(node, version) && isObjectOfMethodCall(node)) {
                    const callAfterChainBreak = node.parent.parent
                    if (isNativeCollectionMethodCall(callAfterChainBreak) || isLodashWrapperMethod(callAfterChainBreak, version)) {
                        context.report({node: callAfterChainBreak, message: REPORT_MESSAGE, data: {method: getMethodName(callAfterChainBreak)}})
                    }
                }
            } else if (lodashContext.isLodashCall(node)) {
                if (node.parent.type === 'MemberExpression' && isMethodCall(node.parent.parent) && (isNativeCollectionMethodCall(node.parent.parent))) {
                    context.report({node: node.parent.parent, message: REPORT_MESSAGE, data: {method: getMethodName(node.parent.parent)}})
                }
            }
        }
        return visitors
    }
}
