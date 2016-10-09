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
        const {isLodashChainStart, isChainBreaker, isNativeCollectionMethodCall, isLodashWrapperMethod, isLodashCall, getLodashImportVisitors} = require('../util/lodashUtil')
        const {isMethodCall, isObjectOfMethodCall, getMethodName} = require('../util/astUtil')
        const {combineVisitorObjects} = require('../util/ruleUtil')
        const {pragma, version} = require('../util/settingsUtil').getSettings(context)
        const REPORT_MESSAGE = "Do not break chain before method '{{method}}'."

        return combineVisitorObjects({
            CallExpression(node) {
                if (isLodashChainStart(node, pragma, context)) {
                    do {
                        node = node.parent.parent
                    } while (isMethodCall(node) && !isChainBreaker(node, version))
                    if (isChainBreaker(node, version) && isObjectOfMethodCall(node)) {
                        const callAfterChainBreak = node.parent.parent
                        if (isNativeCollectionMethodCall(callAfterChainBreak) || isLodashWrapperMethod(callAfterChainBreak, version)) {
                            context.report({node: callAfterChainBreak, message: REPORT_MESSAGE, data: {method: getMethodName(callAfterChainBreak)}})
                        }
                    }
                } else if (isLodashCall(node, pragma, context)) {
                    if (node.parent.type === 'MemberExpression' && isMethodCall(node.parent.parent) && (isNativeCollectionMethodCall(node.parent.parent))) {
                        context.report({node: node.parent.parent, message: REPORT_MESSAGE, data: {method: getMethodName(node.parent.parent)}})
                    }
                }
            }
        }, getLodashImportVisitors(context))
    }
}
