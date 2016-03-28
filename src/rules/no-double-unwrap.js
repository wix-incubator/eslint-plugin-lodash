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
    var settings = require('../util/settingsUtil').getSettings(context);
    return {
        CallExpression: function (node) {
            if (lodashUtil.isImplicitChainStart(node, settings.pragma)) {
                do {
                    node = node.parent.parent;
                } while (astUtil.isMethodCall(node) && !lodashUtil.isChainBreaker(node, settings.version));
                var caller = astUtil.getCaller(node);
                if (astUtil.isMethodCall(node) && !lodashUtil.isChainable(caller, settings.version)) {
                    context.report({
                        node: node,
                        message: 'Do not use .value() after chain-ending method {{method}}',
                        data: {method: astUtil.getMethodName(caller)},
                        fix: function (fixer) {
                            return fixer.removeRange([caller.range[1], node.range[1]]);
                        }
                    });
                }
            }
        }
    };
};
