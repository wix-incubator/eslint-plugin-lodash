/**
 * @fileoverview Rule to check if a call to filter should be a call to compact
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    function isDoubleNegationOfParam(exp, paramName) {
        return astUtil.isNegationExpression(exp) && astUtil.isNegationExpression(exp.argument) && astUtil.isIdentifierOfParam(exp.argument.argument, paramName)
    }

    function isCallToBooleanCastOfParam(exp, paramName) {
        return exp && exp.type === 'CallExpression' && exp.callee.name === 'Boolean' && astUtil.isIdentifierOfParam(exp.arguments[0], paramName)
    }

    function isBooleanCastingFunction(func) {
        const returnValue = astUtil.getValueReturnedInFirstLine(func)
        const paramName = astUtil.getFirstParamName(func)
        return func && func.type === 'Identifier' && func.name === 'Boolean' ||
            (astUtil.isIdentifierOfParam(returnValue, paramName) ||
            isDoubleNegationOfParam(returnValue, paramName) || isCallToBooleanCastOfParam(returnValue, paramName))
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, (node, iteratee) => {
            if (lodashUtil.isCallToMethod(node, settings.version, 'filter') && isBooleanCastingFunction(iteratee)) {
                context.report(node, 'Prefer _.compact over filtering of Boolean casting')
            }
        })
    }
}
