/**
 * @fileoverview Rule to check if an "&&" experssion should be a call to _.get or _.has
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var DEFAULT_LENGTH = 3;
    var astUtil = require('../util/astUtil');
    var ruleDepth = Math.max(parseInt(context.options[0], 10) || DEFAULT_LENGTH, 2);

    var expStates = [];
    function getState() {
        return expStates[expStates.length - 1] || {depth: 0};
    }

    function shouldCheckDeeper(node, nodeRight, toCompare) {
        return node.operator === '&&' && nodeRight && nodeRight.type === 'MemberExpression' && !astUtil.isComputed(nodeRight) && (!toCompare || astUtil.isEquivalentExp(nodeRight, toCompare));
    }

    return {
        LogicalExpression: function (node) {
            var state = getState();
            var rightMemberExp = astUtil.isEqEqEq(node.right) && state.depth === 0 ? node.right.left : node.right;

            if (shouldCheckDeeper(node, rightMemberExp, state.node)) {
                expStates.push({depth: state.depth + 1, node: rightMemberExp.object});
                if (astUtil.isEquivalentExp(node.left, rightMemberExp.object) && state.depth >= ruleDepth - 2) {
                    context.report(node, "Prefer _.get or _.has over an '&&' chain");
                }
            }
        },
        'LogicalExpression:exit': function (node) {
            var state = getState();
            if (state && state.node === node.right.object) {
                expStates.pop();
            }
        }
    };
};
