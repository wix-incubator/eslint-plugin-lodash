/**
 * @fileoverview Rule to enforce usage of collection method values
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)

    function parentUsesValue(node, isChain) {
        const isBeforeChainBreaker = isChain && lodashUtil.isChainBreaker(node.parent.parent, settings.version)
        return (isBeforeChainBreaker ? node.parent.parent : node).parent.type !== 'ExpressionStatement'
    }

    function isPureLodashCollectionMethod(node) {
        return lodashUtil.isLodashCollectionMethod(node, settings.version) && !lodashUtil.isCallToMethod(node, settings.version, 'remove')
    }

    function reportIfMisused(node, isChain) {
        if (isPureLodashCollectionMethod(node) && !parentUsesValue(node, isChain)) {
            context.report(node, `Use value returned from _.${astUtil.getMethodName(node)}`)
        } else if (lodashUtil.isSideEffectIterationMethod(node, settings.version) && parentUsesValue(node, isChain)) {
            context.report(node, `Do not use value returned from _.${astUtil.getMethodName(node)}`)
        }
    }

    return {
        CallExpression(node) {
            if (lodashUtil.isLodashCall(node, settings.pragma)) {
                reportIfMisused(node, false)
            }
            if (lodashUtil.isLodashChainStart(node, settings.pragma)) {
                let curr = node
                while (astUtil.isMethodCall(curr.parent.parent) && !lodashUtil.isChainBreaker(curr.parent.parent, settings.version)) {
                    curr = curr.parent.parent
                }
                reportIfMisused(curr, true)
            }
        }
    }
}