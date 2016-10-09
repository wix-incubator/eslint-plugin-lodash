/**
 * @fileoverview Rule to check that iteratees for all collection functions except forEach return a value;
 */
'use strict'

/**
 * @fileoverview Rule to check that iteratees for all collection functions except forEach return a value;
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const [last, get] = ['last', 'get'].map(m => require(`lodash/${m}`))
        const {getMethodName} = require('../util/astUtil')
        const {isLodashCollectionMethod, isLodashCall, isLodashWrapper} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const callStack = []

        function handleExitOfFunctionWithBlock(node) {
            const functionNode = callStack.pop()
            const lastItem = last(callStack)
            if (!functionNode.found && get(lastItem, 'node.type') === 'CallExpression') {
                context.report(node, `Do not use _.${getMethodName(lastItem.node)} without returning a value`)
            }
            if (lastItem && lastItem.node === node.parent) {
                callStack.pop()
            }
        }
        function addToCallStackIfCollectionMethod(node) {
            if (isLodashCollectionMethod(node, settings.version) &&
                (isLodashCall(node, settings.pragma) || isLodashWrapper(node, settings.pragma, settings.version))) {
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
                const lastItem = last(callStack)
                if (lastItem) {
                    lastItem.found = true
                }
            }
        }
    }
}
