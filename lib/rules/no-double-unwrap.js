/**
 * @fileoverview Rule to make sure value() wasn't called on a lodash chain twice
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);
    return {
        CallExpression: function (node) {
            if (lodashUtil.isImplicitChainStart(node, lodashPragma)) {
                do {
                    node = node.parent.parent;
                } while (astUtil.isMethodCall(node) && !lodashUtil.isChainBreaker(node));
                var caller = astUtil.getCaller(node);
                if (astUtil.isMethodCall(node) && !lodashUtil.isChainable(caller)) {
                    context.report(node, 'Do not use .value() after chain-ending method {{method}}', {method: astUtil.getMethodName(caller)});
                }
            }
        }
    };
};
