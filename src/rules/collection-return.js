/**
 * @fileoverview Rule to check that iteratees for all collection functions except forEach return a value;
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const _ = require('lodash')
    const astUtil = require('../util/astUtil')
    const lodashUtil = require('../util/lodashUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    const callStack = []

    function handleExitOfFunctionWithBlock(node) {
        const functionNode = callStack.pop()
        const last = _.last(callStack)
        if (!functionNode.found && _.get(last, 'node.type') === 'CallExpression') {
            context.report(node, `Do not use _.${astUtil.getMethodName(last.node)} without returning a value`)
        }
        if (last && last.node === node.parent) {
            callStack.pop()
        }
    }
    function addToCallStackIfCollectionMethod(node) {
        if (lodashUtil.isLodashCollectionMethod(node, settings.version) &&
            (lodashUtil.isLodashCall(node, settings.pragma) || lodashUtil.isLodashWrapper(node, settings.pragma, settings.version))) {
            callStack.push({node})
        }
    }

    return {
        FunctionExpression(node) {
            addToCallStackIfCollectionMethod(node.parent)
            callStack.push({node, found: false})
        },
        'FunctionExpression:exit': handleExitOfFunctionWithBlock,
        ArrowFunctionExpression(node) {
            if (node.body.type === 'BlockStatement') {
                addToCallStackIfCollectionMethod(node.parent)
                callStack.push({node, found: false})
            }
        },
        'ArrowFunctionExpression:exit'(node) {
            if (node.body.type === 'BlockStatement') {
                handleExitOfFunctionWithBlock(node)
            }
        },
        ReturnStatement() {
            const last = _.last(callStack)
            if (last) {
                last.found = true
            }
        }
    }
}
