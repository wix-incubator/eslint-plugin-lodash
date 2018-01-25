/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const getDocsUrl = require('../util/getDocsUrl')

module.exports = {
    meta: {
        docs: {
            url: getDocsUrl('chaining.md')
        },
        schema: [{
            enum: ['always', 'never']
        }, {
            type: 'integer',
            minimum: 2
        }]
    },

    create(context) {
        const {getLodashContext, isChainBreaker} = require('../util/lodashUtil')
        const {getCaller, isMethodCall, isObjectOfMethodCall} = require('../util/astUtil')
        const DEFAULT_LENGTH = 3
        const lodashContext = getLodashContext(context)
        const version = lodashContext.version
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
            } else if (lodashContext.isLodashCall(node) || lodashContext.getImportedLodashMethod(node)) {
                return isNestedNLevels(node.arguments[0], n - 1)
            }
        }

        const callExpressionVisitors = {
            always: node => {
                if (isNestedNLevels(node, ruleDepth)) {
                    context.report({node, message: 'Prefer chaining to composition'})
                } else if (lodashContext.isLodashChainStart(node)) {
                    const firstCall = node.parent.parent
                    if (isMethodCall(firstCall) && (isEndOfChain(firstCall) || isBeforeChainBreaker(firstCall))) {
                        context.report({node: firstCall, message: 'Do not use chain syntax for single method'})
                    }
                }
            },
            never: node => {
                if (lodashContext.isLodashChainStart(node)) {
                    context.report({node, message: 'Prefer composition to Lodash chaining'})
                }
            }
        }

        const visitors = lodashContext.getImportVisitors()
        visitors.CallExpression = callExpressionVisitors[mode]
        return visitors
    }
}
