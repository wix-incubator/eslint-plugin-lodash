/**
 * @fileoverview Rule to enforce usage of collection method values
 */
'use strict'

/**
 * @fileoverview Rule to enforce usage of collection method values
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    create(context) {
        const {
            isChainBreaker, 
            isLodashCollectionMethod, 
            isCallToMethod, 
            isSideEffectIterationMethod,
            isLodashCall,
            isLodashChainStart
        } = require('../util/lodashUtil')
        const {getMethodName, isMethodCall} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)

        function parentUsesValue(node, isChain) {
            const isBeforeChainBreaker = isChain && isChainBreaker(node.parent.parent, settings.version)
            return (isBeforeChainBreaker ? node.parent.parent : node).parent.type !== 'ExpressionStatement'
        }

        function isPureLodashCollectionMethod(node) {
            return isLodashCollectionMethod(node, settings.version) && !isCallToMethod(node, settings.version, 'remove')
        }

        function reportIfMisused(node, isChain) {
            if (isPureLodashCollectionMethod(node) && !parentUsesValue(node, isChain)) {
                context.report(node, `Use value returned from _.${getMethodName(node)}`)
            } else if (isSideEffectIterationMethod(node, settings.version) && parentUsesValue(node, isChain)) {
                context.report(node, `Do not use value returned from _.${getMethodName(node)}`)
            }
        }

        return {
            CallExpression(node) {
                if (isLodashCall(node, settings.pragma)) {
                    reportIfMisused(node, false)
                }
                if (isLodashChainStart(node, settings.pragma)) {
                    let curr = node
                    while (isMethodCall(curr.parent.parent) && !isChainBreaker(curr.parent.parent, settings.version)) {
                        curr = curr.parent.parent
                    }
                    reportIfMisused(curr, true)
                }
            }
        }
    }
}
