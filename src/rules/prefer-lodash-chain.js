/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    const REPORT_MESSAGE = "Do not break chain before method '{{method}}'."

    return {
        CallExpression(node) {
            if (lodashUtil.isLodashChainStart(node, settings.pragma)) {
                do {
                    node = node.parent.parent
                } while (astUtil.isMethodCall(node) && !lodashUtil.isChainBreaker(node, settings.version))
                if (lodashUtil.isChainBreaker(node, settings.version) && astUtil.isObjectOfMethodCall(node)) {
                    const callAfterChainBreak = node.parent.parent
                    if (lodashUtil.isNativeCollectionMethodCall(callAfterChainBreak) || lodashUtil.isLodashWrapperMethod(callAfterChainBreak, settings.version)) {
                        context.report({node: callAfterChainBreak, message: REPORT_MESSAGE, data: {method: astUtil.getMethodName(callAfterChainBreak)}})
                    }
                }
            } else if (lodashUtil.isLodashCall(node, settings.pragma)) {
                if (node.parent.type === 'MemberExpression' && astUtil.isMethodCall(node.parent.parent) && (lodashUtil.isNativeCollectionMethodCall(node.parent.parent))) {
                    context.report({node: node.parent.parent, message: REPORT_MESSAGE, data: {method: astUtil.getMethodName(node.parent.parent)}})
                }
            }
        }
    }
}
