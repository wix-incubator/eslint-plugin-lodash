/**
 * @fileoverview Rule to make sure value() wasn't called on a lodash chain twice
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    return {
        CallExpression(node) {
            if (lodashUtil.isImplicitChainStart(node, settings.pragma)) {
                do {
                    node = node.parent.parent
                } while (astUtil.isMethodCall(node) && !lodashUtil.isChainBreaker(node, settings.version))
                const caller = astUtil.getCaller(node)
                if (astUtil.isMethodCall(node) && !lodashUtil.isChainable(caller, settings.version)) {
                    context.report({
                        node,
                        message: 'Do not use .value() after chain-ending method {{method}}',
                        data: {method: astUtil.getMethodName(caller)},
                        fix(fixer) {
                            return fixer.removeRange([caller.range[1], node.range[1]])
                        }
                    })
                }
            }
        }
    }
}
