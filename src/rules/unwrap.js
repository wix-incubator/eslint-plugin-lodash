/**
 * @fileoverview Rule to ensure a lodash chain ends
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isImplicitChainStart, isExplicitChainStart, isChainable, isCallToMethod, isChainBreaker, getLodashImportVisitors} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const {getCaller} = require('../util/astUtil')
        const negate = require('lodash/negate')
        const {combineVisitorObjects} = require('../util/ruleUtil')
        function isCommit(node) {
            return isCallToMethod(node, settings.version, 'commit')
        }

        function getEndOfChain(node, isExplicit) {
            const stillInChain = isExplicit ? negate(isChainBreaker) : isChainable
            let curr = node.parent.parent
            while (curr === getCaller(curr.parent.parent) && stillInChain(curr, settings.version)) {
                curr = curr.parent.parent
            }
            return curr
        }

        return combineVisitorObjects({
            CallExpression(node) {
                if (isImplicitChainStart(node, settings.pragma, context)) {
                    const end = getEndOfChain(node, false)
                    if (!isCommit(end) && isChainable(end, settings.version)) {
                        context.report(end, 'Missing unwrapping at end of chain')
                    }
                } else if (isExplicitChainStart(node, settings.pragma, context)) {
                    const end = getEndOfChain(node, true)
                    if (!isCommit(end) && !isChainBreaker(end, settings.version)) {
                        context.report(end, 'Missing unwrapping at end of chain')
                    }
                }
            }
        }, getLodashImportVisitors(context))
    }
}