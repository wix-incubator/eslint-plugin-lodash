/**
 * @fileoverview Rule to disallow using _.prototype.commit.
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    return {
        CallExpression(node) {
            if (lodashUtil.isLodashChainStart(node, settings.pragma)) {
                do {
                    node = node.parent.parent
                } while (astUtil.isMethodCall(node) && !lodashUtil.isCallToMethod(node, settings.version, 'commit'))
                if (lodashUtil.isCallToMethod(node, settings.version, 'commit')) {
                    context.report(node, 'Do not end chain with commit.')
                }
            }
        }
    }
}
