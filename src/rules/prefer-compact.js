/**
 * @fileoverview Rule to check if a call to filter should be a call to compact
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to filter should be a call to compact
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isNegationExpression, isIdentifierWithName, getValueReturnedInFirstStatement, getFirstParamName} = require('../util/astUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')

        function isDoubleNegationOfParam(exp, paramName) {
            return isNegationExpression(exp) && isNegationExpression(exp.argument) && isIdentifierWithName(exp.argument.argument, paramName)
        }

        function isCallToBooleanCastOfParam(exp, paramName) {
            return exp && exp.type === 'CallExpression' && exp.callee.name === 'Boolean' && isIdentifierWithName(exp.arguments[0], paramName)
        }

        function isBooleanCastingFunction(func) {
            const returnValue = getValueReturnedInFirstStatement(func)
            const paramName = getFirstParamName(func)
            return func && func.type === 'Identifier' && func.name === 'Boolean' ||
                (isIdentifierWithName(returnValue, paramName) ||
                isDoubleNegationOfParam(returnValue, paramName) || isCallToBooleanCastOfParam(returnValue, paramName))
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'filter', method) && isBooleanCastingFunction(iteratee)) {
                context.report(node, 'Prefer _.compact over filtering of Boolean casting')
            }
        })
    }
}
