/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [{
            type: 'object',
            properties: {
                ignoredMethods: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                ignoredObjects: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }
        }]
    },

    create(context) {

        const {isNativeCollectionMethodCall, getLodashImportVisitors, getLodashMethodCallExpVisitor} = require('../util/lodashUtil')
        const {combineVisitorObjects} = require('../util/ruleUtil')
        const {getMethodName, getCaller} = require('../util/astUtil')
        const [get, includes, matches, some, map] = ['get', 'includes', 'matches', 'some', 'map'].map(m => require(`lodash/${m}`))
        const ignoredMethods = get(context, ['options', 0, 'ignoreMethods'], [])
        const ignoredObjects = get(context, ['options', 0, 'ignoreObjects'], [])
        const usingLodash = new Set()

        function isNonNullObjectCreate(callerName, methodName, arg) {
            return callerName === 'Object' && methodName === 'create' && get(arg, 'value') !== null
        }

        function isStaticNativeMethodCall(node) {
            const staticMethods = {
                Object: ['assign', 'keys', 'values'],
                Array: ['isArray']
            }
            const callerName = get(node, 'callee.object.name')
            const methodName = getMethodName(node)
            return (callerName in staticMethods) && includes(staticMethods[callerName], methodName) || isNonNullObjectCreate(callerName, methodName, node.arguments[0])
        }

        function isNativeStringMethodCall(node) {
            return includes(['endsWith', 'includes', 'padEnd', 'padStart', 'startsWith'], getMethodName(node))
        }

        function canUseLodash(node) {
            return isNativeCollectionMethodCall(node) || isStaticNativeMethodCall(node) || isNativeStringMethodCall(node)
        }

        function getTextOfNode(node) {
            if (node) {
                if (node.type === 'Identifier') {
                    return node.name
                }
                return context.getSourceCode().getText(node)
            }
        }

        function someMatch(patterns, str) {
            return str && some(patterns, pattern => str.match(pattern))
        }

        function shouldIgnore(node) {
            return someMatch(ignoredMethods, getMethodName(node)) || someMatch(ignoredObjects, getTextOfNode(getCaller(node)))
        }

        return combineVisitorObjects({
            CallExpression: getLodashMethodCallExpVisitor(context, node => {
                usingLodash.add(node)
            }),
            'CallExpression:exit'(node) {
                if (!usingLodash.has(node) && !shouldIgnore(node) && canUseLodash(node)) {
                    context.report(node, `Prefer '_.${getMethodName(node)}' over the native function.`)
                }
            }
        }, getLodashImportVisitors(context))
    }
}
