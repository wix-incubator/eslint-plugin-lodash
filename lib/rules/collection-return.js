/**
 * @fileoverview Rule to check that iteratees for all collection functions except forEach return a value;
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var astUtil = require('../util/astUtil');
    var lodashUtil = require('../util/lodashUtil');
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);

    var callStack = [];

    function handleExitOfFunctionWithBlock(node) {
        var functionNode = callStack.pop();
        var last = _.last(callStack);
        if (!functionNode.found && _.get(last, 'node.type') === 'CallExpression') {
            context.report(node, 'Do not use _.' + astUtil.getMethodName(last.node) + ' without returning a value');
        }
        if (last && last.node === node.parent) {
            callStack.pop();
        }
    }
    function addToCallStackIfCollectionMethod(node) {
        if (node.parent.type === 'CallExpression' && lodashUtil.isLodashCollectionMethod(node.parent, lodashPragma)) {
            callStack.push({node: node.parent});
        }
    }

    return {
        FunctionExpression: function (node) {
            addToCallStackIfCollectionMethod(node);
            callStack.push({node: node, found: false});
        },
        'FunctionExpression:exit': handleExitOfFunctionWithBlock,
        ArrowFunctionExpression: function (node) {
            addToCallStackIfCollectionMethod(node);
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
            var last = _.last(callStack);
            if (last) {
                last.found = true;
            }
        },
        'CallExpression:exit': function (node) {
            var last = _.last(callStack);
            if (last && last.node === node) {
                callStack.pop();
            }
        }
    };
};
