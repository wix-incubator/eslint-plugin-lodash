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
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);


    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, lodashPragma)) {
                do {
                    node = node.parent.parent;
                } while (astUtil.isMethodCall(node) && !lodashUtil.isCallToMethod(node, 'commit'));
                if (lodashUtil.isCallToMethod(node, 'commit') && !lodashUtil.isCallToMethod(astUtil.getCaller(node), 'forEach')) {
                    context.report(node, 'Do not end chain with commit, except for side effects.');
                }
            }
        }
    };
};
