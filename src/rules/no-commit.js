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
        const {isLodashChainStart, isCallToMethod} = require('../util/lodashUtil')
        const {isMethodCall} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        return {
            CallExpression(node) {
                if (isLodashChainStart(node, settings.pragma)) {
                    do {
                        node = node.parent.parent
                    } while (isMethodCall(node) && !isCallToMethod(node, settings.version, 'commit'))
                    if (isCallToMethod(node, settings.version, 'commit')) {
                        context.report(node, 'Do not end chain with commit.')
                    }
                }
            }
        }
    }
}
