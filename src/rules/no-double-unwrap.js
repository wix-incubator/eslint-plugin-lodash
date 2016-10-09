/**
 * @fileoverview Rule to make sure value() wasn't called on a lodash chain twice
 */
'use strict'

/**
 * @fileoverview Rule to make sure value() wasn't called on a lodash chain twice
 */
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    meta: {
        fixable: "code"
    },
    create(context) {
        const {isImplicitChainStart, isChainBreaker, isChainable} = require('../util/lodashUtil')
        const {isMethodCall, getCaller, getMethodName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        return {
            CallExpression(node) {
                if (isImplicitChainStart(node, settings.pragma)) {
                    do {
                        node = node.parent.parent
                    } while (isMethodCall(node) && !isChainBreaker(node, settings.version))
                    const caller = getCaller(node)
                    if (isMethodCall(node) && !isChainable(caller, settings.version)) {
                        context.report({
                            node,
                            message: 'Do not use .value() after chain-ending method {{method}}',
                            data: {method: getMethodName(caller)},
                            fix(fixer) {
                                return fixer.removeRange([caller.range[1], node.range[1]])
                            }
                        })
                    }
                }
            }
        }
    }
}
