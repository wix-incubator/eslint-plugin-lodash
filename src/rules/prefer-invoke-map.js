/**
 * @fileoverview Rule to check if a call to map should be a call to invokeMap
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {}
    },

    create(context) {
        const {getLodashMethodVisitor, isCallToMethod} = require('../util/lodashUtil')
        const {isCallFromObject, getValueReturnedInFirstLine, getFirstParamName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)

        function isFunctionMethodCallOfParam(func) {
            const firstParamName = getFirstParamName(func)
            return firstParamName && isCallFromObject(getValueReturnedInFirstLine(func), firstParamName)
        }

        return {
            CallExpression: getLodashMethodVisitor(settings, (node, iteratee) => {
                if (isCallToMethod(node, settings.version, 'map') && isFunctionMethodCallOfParam(iteratee)) {
                    context.report(node, 'Prefer _.invokeMap over map to a method call.')
                }
            })
        }
    }
}