/**
 * @fileoverview Rule to disallow using _.prototype.commit unless used after a function that only runs for its side effect.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, settings.pragma)) {
                do {
                    node = node.parent.parent;
                } while (astUtil.isMethodCall(node) && !lodashUtil.isCallToMethod(node, settings.version, 'commit'));
                if (lodashUtil.isCallToMethod(node, settings.version, 'commit') && !lodashUtil.isCallToMethod(astUtil.getCaller(node), settings.version, 'forEach')) {
                    context.report(node, 'Do not end chain with commit, except for side effects.');
                }
            }
        }
    };
};
