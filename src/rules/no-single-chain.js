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
        const {isChainBreaker, isLodashChainStart} = require('../util/lodashUtil')
        const {isObjectOfMethodCall, isMethodCall} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const negate = require('lodash/negate')
        
        const isEndOfChain = negate(isObjectOfMethodCall)

        function isBeforeChainBreaker(node) {
            return isChainBreaker(node.parent.parent, settings.version)
        }

        return {
            CallExpression(node) {
                if (isLodashChainStart(node, settings.pragma)) {
                    const firstCall = node.parent.parent
                    if (isMethodCall(firstCall) && (isEndOfChain(firstCall) || isBeforeChainBreaker(firstCall))) {
                        context.report(firstCall, 'Do not use chain syntax for single method')
                    }
                }
            }
        }
    }
}