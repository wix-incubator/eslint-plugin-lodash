/**
 * @fileoverview Rule to check if a call to map should be a call to invokeMap
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-invoke-map.md'
        }
    },

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isCallFromObject, getValueReturnedInFirstStatement, getFirstParamName} = require('../util/astUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')

        function isOnlyUsedForObject(func, firstParamName) {
            const declaredVariables = context.getDeclaredVariables(func)
            return declaredVariables.every(variable => variable.references.length === 0 || (variable.name === firstParamName && variable.references.length === 1))
        }

        function isFunctionMethodCallOfParam(func) {
            const firstParamName = getFirstParamName(func)
            return firstParamName && isCallFromObject(getValueReturnedInFirstStatement(func), firstParamName) && isOnlyUsedForObject(func, firstParamName)
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'map', method) && isFunctionMethodCallOfParam(iteratee)) {
                context.report({node, message: 'Prefer _.invokeMap over map to a method call.'})
            }
        })
    }
}
