/**
 * @fileoverview Rule to check if an "&&" experssion should be a call to _.get or _.has
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var astUtil = require('../util/astUtil');
    var lodashUtil = require('../util/lodashUtil');
    var callStack = [];

    function handleExitOfFunctionWithBlock(node) {
        var functionNode = callStack.pop();
        var last = _.last(callStack);
        if (!functionNode.found && _.get(last, 'node.type') === 'CallExpression') {
            context.report(node, 'Do not use _.' + astUtil.getMethodName(last.node) + ' without returning a value');
        }
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashCollectionMethod(node)) {
                callStack.push({node: node});
            }
        },
        'CallExpression:exit': function (node) {
            var last = _.last(callStack);
            if (last && last.node === node) {
                callStack.pop();
            }
        },
        FunctionExpression: function (node) {
            callStack.push({node: node, found: false});
        },
        'FunctionExpression:exit': handleExitOfFunctionWithBlock,
        ArrowFunctionExpression: function (node) {
            if (node.body.type === 'BlockStatement') {
                callStack.push({node: node, found: false});
            }
        },
        'ArrowFunctionExpression:exit': function (node) {
            var last = _.last(callStack);
            if (last && last.node === node) {
                handleExitOfFunctionWithBlock(node);
            }
        },
        ReturnStatement: function () {
            _.last(callStack).found = true;
        }
    };
};
