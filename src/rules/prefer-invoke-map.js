/**
 * @fileoverview Rule to check if a call to map should be a call to invokeMap
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    function isFunctionMethodCallOfParam(func) {
        return astUtil.isCallFromObject(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func))
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, (node, iteratee) => {
            if (lodashUtil.isCallToMethod(node, settings.version, 'map') && isFunctionMethodCallOfParam(iteratee)) {
                context.report(node, 'Prefer _.invokeMap over map to a method call.')
            }
        })
    }
}
