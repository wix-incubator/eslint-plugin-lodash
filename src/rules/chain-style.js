/**
 * @fileoverview Rule to enforce a specific chain style
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    const callExpressionVisitors = {
        'as-needed'(node) {
            if (lodashUtil.isExplicitChainStart(node, settings.pragma)) {
                let curr = node.parent.parent
                let needed = false
                while (astUtil.isMethodCall(curr) && !lodashUtil.isChainBreaker(curr, settings.version)) {
                    if (!lodashUtil.isChainable(curr, settings.version) && !lodashUtil.isChainBreaker(curr.parent.parent, settings.version)) {
                        needed = true
                    }
                    curr = curr.parent.parent
                }
                if (astUtil.isMethodCall(curr) && !needed) {
                    context.report(node, 'Unnecessary explicit chaining')
                }
            }
        },
        implicit(node) {
            if (lodashUtil.isExplicitChainStart(node, settings.pragma)) {
                context.report(node, 'Do not use explicit chaining')
            }
        },
        explicit(node) {
            if (lodashUtil.isImplicitChainStart(node, settings.pragma)) {
                context.report(node, 'Do not use implicit chaining')
            }
        }
    }

    return {
        CallExpression: callExpressionVisitors[context.options[0] || 'as-needed']
    }
}

module.exports.schema = [
    {
        enum: ['as-needed', 'implicit', 'explicit']
    }
]