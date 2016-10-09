/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
'use strict'

/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [{
            enum: ['always', 'never']
        }, {
            type: 'integer',
            minimum: 2
        }]
    },

    create(context) {
        const {isLodashCall, getLodashImportVisitors, isLodashChainStart, getImportedLodashMethod, isChainBreaker} = require('../util/lodashUtil')
        const {getCaller, isMethodCall, isObjectOfMethodCall} = require('../util/astUtil')
        const {combineVisitorObjects} = require('../util/ruleUtil')
        const DEFAULT_LENGTH = 3
        const {pragma, version} = require('../util/settingsUtil').getSettings(context)
        const negate = require('lodash/negate')

        const mode = context.options[0] || 'never'
        const ruleDepth = parseInt(context.options[1], 10) || DEFAULT_LENGTH

        const isEndOfChain = negate(isObjectOfMethodCall)

        function isBeforeChainBreaker(node) {
            return isChainBreaker(node.parent.parent, version)
        }

        function isNestedNLevels(node, n) {
            if (n === 0) {
                return true
            } else if (isLodashCall(node, pragma, context) || getImportedLodashMethod(context, node)) {
                return isNestedNLevels(node.arguments[0], n - 1)
            }
        }

        const callExpressionVisitors = {
            always: node => {
                if (isNestedNLevels(node, ruleDepth)) {
                    context.report(getCaller(node.arguments[0]), 'Prefer chaining to composition')
                } else if (isLodashChainStart(node, pragma, context)) {
                    const firstCall = node.parent.parent
                    if (isMethodCall(firstCall) && (isEndOfChain(firstCall) || isBeforeChainBreaker(firstCall))) {
                        context.report(firstCall, 'Do not use chain syntax for single method')
                    }
                }
            },
            never: node => {
                if (isLodashChainStart(node, pragma, context)) {
                    context.report(node, 'Prefer composition to Lodash chaining')
                }
            }
        }

        return combineVisitorObjects({
            CallExpression: callExpressionVisitors[mode]
        }, getLodashImportVisitors(context))
    }
}