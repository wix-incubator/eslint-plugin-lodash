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
    var ruleDepth = parseInt(context.options[0], 10) || DEFAULT_LENGTH;
    var _ = require('lodash');

    var expStates = [];
    function getState() {
        return expStates[expStates.length - 1] || {depth: 0};
    }

    function isMemberExpOfNodeOrRightmost(node, toCompare) {
        return node.type === 'MemberExpression' && !astUtil.isComputed(node) &&
        (!toCompare || astUtil.isEquivalentExp(node.object, toCompare));
    }

    function shouldCheckDeeper(node, toCompare) {
        return node.operator === '&&' && astUtil.isEqEqEq(node.right) && isMemberExpOfNodeOrRightmost(node.right.left, toCompare);
    }

    return {
        LogicalExpression: function (node) {
            var state = getState();
            if (shouldCheckDeeper(node, state.node)) {
                expStates.push({depth: state.depth + 1, node: node.right.left.object});
                if (astUtil.isEquivalentExp(_.get(node, 'left.left.object'), _.get(node, 'right.left.object')) && state.depth >= ruleDepth - 2) {
                    context.report(node, 'Prefer _.matches over conditions on the same object');
                }
            }
        },
        'LogicalExpression:exit': function (node) {
            var state = getState();
            if (state && state.node === _.get(node, 'right.left.object')) {
                expStates.pop();
            }
        }
    };
};

module.exports.schema = [
    {
        type: 'integer',
        minimum: 2
    }
];