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
    create(context) {
        const {
            isLodashChainStart,
            isChainBreaker,
            isNativeCollectionMethodCall,
            isLodashWrapperMethod,
            isLodashCall
        } = require('../util/lodashUtil')
        const {isMethodCall, isObjectOfMethodCall, getMethodName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const REPORT_MESSAGE = "Do not break chain before method '{{method}}'."

        return {
            CallExpression(node) {
                if (isLodashChainStart(node, settings.pragma)) {
                    do {
                        node = node.parent.parent
                    } while (isMethodCall(node) && !isChainBreaker(node, settings.version))
                    if (isChainBreaker(node, settings.version) && isObjectOfMethodCall(node)) {
                        const callAfterChainBreak = node.parent.parent
                        if (isNativeCollectionMethodCall(callAfterChainBreak) || isLodashWrapperMethod(callAfterChainBreak, settings.version)) {
                            context.report({node: callAfterChainBreak, message: REPORT_MESSAGE, data: {method: getMethodName(callAfterChainBreak)}})
                        }
                    }
                } else if (isLodashCall(node, settings.pragma)) {
                    if (node.parent.type === 'MemberExpression' && isMethodCall(node.parent.parent) && (isNativeCollectionMethodCall(node.parent.parent))) {
                        context.report({node: node.parent.parent, message: REPORT_MESSAGE, data: {method: getMethodName(node.parent.parent)}})
                    }
                }
            }
        }
    }
}
