/**
 * @fileoverview Rule to disallow using _.prototype.commit.
 */
'use strict'

/**
 * @fileoverview Rule to disallow using _.prototype.commit.
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isLodashChainStart, isCallToMethod, getLodashImportVisitors} = require('../util/lodashUtil')
        const {isMethodCall} = require('../util/astUtil')
        const {pragma, version} = require('../util/settingsUtil').getSettings(context)
        const {combineVisitorObjects} = require('../util/ruleUtil')
        return combineVisitorObjects({
            CallExpression(node) {
                if (isLodashChainStart(node, pragma, context)) {
                    do {
                        node = node.parent.parent
                    } while (isMethodCall(node) && !isCallToMethod(node, version, 'commit'))
                    if (isCallToMethod(node, version, 'commit')) {
                        context.report(node, 'Do not end chain with commit.')
                    }
                }
            }
        }, getLodashImportVisitors(context))
    }
}
