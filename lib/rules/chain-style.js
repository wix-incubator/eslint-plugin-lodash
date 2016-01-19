/**
 * @fileoverview Rule to enforce a specific chain style
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var callExpressionVisitors = {
        'as-needed': function (node) {
            if (lodashUtil.isExplicitChainStart(node)) {
                var curr = node.parent.parent;
                var needed = false;
                while (astUtil.isMethodCall(curr) && !lodashUtil.isChainBreaker(curr)) {
                    if (!lodashUtil.isChainable(curr) && !lodashUtil.isChainBreaker(curr.parent.parent)) {
                        needed = true;
                    }
                    curr = curr.parent.parent;
                }
                if (astUtil.isMethodCall(curr) && !needed) {
                    context.report(node, 'Unnecessary explicit chaining');
                }
            }
        },
        implicit: function (node) {
            if (lodashUtil.isExplicitChainStart(node)) {
                context.report(node, 'Do not use explicit chaining');
            }
        },
        explicit: function (node) {
            if (lodashUtil.isImplicitChainStart(node)) {
                context.report(node, 'Do not use implicit chaining');
            }
        }
    };

    return {
        CallExpression: callExpressionVisitors[context.options[0] || 'as-needed']
    };
};

module.exports.schema = [
    {
        enum: ['as-needed', 'implicit', 'explicit']
    }
];