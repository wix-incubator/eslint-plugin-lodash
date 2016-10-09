/**
 * @fileoverview Rule to enforce a specific chain style
 */
'use strict'

/**
 * @fileoverview Rule to enforce a specific chain style
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    meta: {
        schema: [{
            enum: ['as-needed', 'implicit', 'explicit']
        }]
    },

    create(context) {
        const {isChainable, isChainBreaker, isExplicitChainStart, isImplicitChainStart, getLodashImportVisitors} = require('../util/lodashUtil')
        const {isMethodCall} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const {combineVisitorObjects} = require('../util/ruleUtil')
        const callExpressionVisitors = {
            'as-needed'(node) {
                if (isExplicitChainStart(node, settings.pragma, context)) {
                    let curr = node.parent.parent
                    let needed = false
                    while (isMethodCall(curr) && !isChainBreaker(curr, settings.version)) {
                        if (!isChainable(curr, settings.version) && !isChainBreaker(curr.parent.parent, settings.version)) {
                            needed = true
                        }
                        curr = curr.parent.parent
                    }
                    if (isMethodCall(curr) && !needed) {
                        context.report(node, 'Unnecessary explicit chaining')
                    }
                }
            },
            implicit(node) {
                if (isExplicitChainStart(node, settings.pragma, context)) {
                    context.report(node, 'Do not use explicit chaining')
                }
            },
            explicit(node) {
                if (isImplicitChainStart(node, settings.pragma, context)) {
                    context.report(node, 'Do not use implicit chaining')
                }
            }
        }

        return combineVisitorObjects({
            CallExpression: callExpressionVisitors[context.options[0] || 'as-needed']
        }, getLodashImportVisitors(context))
    }
}