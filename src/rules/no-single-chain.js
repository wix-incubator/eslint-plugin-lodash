/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict'

/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isChainBreaker, isLodashChainStart, getLodashImportVisitors} = require('../util/lodashUtil')
        const {isObjectOfMethodCall, isMethodCall} = require('../util/astUtil')
        const {version, pragma} = require('../util/settingsUtil').getSettings(context)
        const {combineVisitorObjects} = require('../util/ruleUtil')
        const negate = require('lodash/negate')
        
        const isEndOfChain = negate(isObjectOfMethodCall)

        function isBeforeChainBreaker(node) {
            return isChainBreaker(node.parent.parent, version)
        }

        return combineVisitorObjects({
            CallExpression(node) {
                if (isLodashChainStart(node, pragma)) {
                    const firstCall = node.parent.parent
                    if (isMethodCall(firstCall) && (isEndOfChain(firstCall) || isBeforeChainBreaker(firstCall))) {
                        context.report(firstCall, 'Do not use chain syntax for single method')
                    }
                }
            }
        }, getLodashImportVisitors(context))
    }
}