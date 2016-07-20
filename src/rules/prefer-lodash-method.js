/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {

    const {isLodashCall, isLodashWrapper, isNativeCollectionMethodCall} = require('../util/lodashUtil')
    const {getMethodName, getCaller} = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    const [get, includes, cond, matches, property, some, map] = ['get', 'includes', 'cond', 'matches', 'property', 'some', 'map'].map(m => require(`lodash/${m}`))
    const REPORT_MESSAGE = 'Prefer \'_.{{method}}\' over the native function.'
    const exceptions = get(context, ['options', 0, 'except'], [])
    const ignoredObjects = get(context, ['options', 0, 'ignoreObjects'], [])
    const ignoredPatterns = map(get(context, ['options', 0, 'ignorePatterns'], []), pattern => new RegExp(pattern))

    function isStaticNativeMethodCall(node) {
        const staticMethods = {
            Object: ['assign', 'create', 'keys', 'values'],
            Array: ['isArray']
        }
        const callerName = get(node, 'callee.object.name')
        return (callerName in staticMethods) && includes(staticMethods[callerName], getMethodName(node))
    }

    function isUsingLodash(node) {
        return isLodashCall(node, settings.pragma) || isLodashWrapper(getCaller(node), settings.pragma, settings.version)
    }

    function canUseLodash(node) {
        return isNativeCollectionMethodCall(node) || isStaticNativeMethodCall(node)
    }

    const getTextOfNode = cond([
        [matches({type: 'Identifier'}), property('name')],
        [property('type'), node => context.getSourceCode().getText(node)]
    ])

    function isIgnoredObject(node) {
        const callerName = getTextOfNode(getCaller(node))
        if (!callerName) { return false }

        if (includes(ignoredObjects, callerName)) { return true }

        if (some(ignoredPatterns, pattern => callerName.match(pattern))) { return true }

        return false
    }

    function isRuleException(node) {
        return includes(exceptions, getMethodName(node))
    }

    return {
        CallExpression(node) {
            if (!isRuleException(node) && !isIgnoredObject(node) && canUseLodash(node) && !isUsingLodash(node)) {
                context.report(node, REPORT_MESSAGE, {method: getMethodName(node)})
            }
        }
    }
}

module.exports.schema = [
    {
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
            }
        }
    }
]
