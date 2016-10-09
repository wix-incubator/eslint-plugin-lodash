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
                except: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                ignoreObjects: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                ignorePatterns: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                }
            }
        }]
    },

    create(context) {

        const {isNativeCollectionMethodCall, getLodashMethodCallExpVisitor, getLodashImportVisitors} = require('../util/lodashUtil')
        const {combineVisitorObjects} = require('../util/ruleUtil')
        const {getMethodName, getCaller} = require('../util/astUtil')
        const [get, includes, cond, matches, property, some, map] = ['get', 'includes', 'cond', 'matches', 'property', 'some', 'map'].map(m => require(`lodash/${m}`))
        const exceptions = get(context, ['options', 0, 'except'], [])
        const ignoredObjects = get(context, ['options', 0, 'ignoreObjects'], [])
        const ignoredPatterns = map(get(context, ['options', 0, 'ignorePatterns'], []), pattern => new RegExp(pattern))
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

        function canUseLodash(node) {
            return isNativeCollectionMethodCall(node) || isStaticNativeMethodCall(node)
        }

        const getTextOfNode = cond([
            [matches({type: 'Identifier'}), property('name')],
            [property('type'), node => context.getSourceCode().getText(node)]
        ])

        function isRuleException(node) {
            return includes(exceptions, getMethodName(node))
        }

        function isIgnoredObject(node) {
            const callerName = getTextOfNode(getCaller(node))
            if (!callerName) { return false }

            if (includes(ignoredObjects, callerName)) { return true }

            if (some(ignoredPatterns, pattern => callerName.match(pattern))) { return true }

            return false
        }

        function shouldIgnore(node) {
            return isRuleException(node) || isIgnoredObject(node)
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
