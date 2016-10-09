/**
 * @fileoverview Rule to check if a _.filter condition or multiple filters should be _.overEvery or _.overSome
 */
'use strict'

/**
 * @fileoverview Rule to check if a _.filter condition or multiple filters should be _.overEvery or _.overSome
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isCallToMethod, getLodashMethodVisitor} = require('../util/lodashUtil')
        const {getValueReturnedInFirstLine, getFirstParamName, isObjectOfMethodCall} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const conditionMethods = ['filter', 'reject', 'pickBy', 'omitBy', 'findIndex', 'findLastIndex', 'find', 'findLast', 'findKey', 'findLastKey']
        const message = 'Prefer _.{{method}} instead of a {{connective}}'

        const reportConstants = {
            '&&': {
                method: 'overEvery',
                connective: 'conjunction'
            },
            '||': {
                method: 'overSome',
                connective: 'disjunction'
            }
        }

        function onlyPassesIdentifier(node) {
            return node.arguments.length === 1 && node.arguments[0].type === 'Identifier'
        }


        function isOnlyParamInvocationsWithOperator(node, paramName, operator) {
            if (node.type === 'CallExpression') {
                return onlyPassesIdentifier(node) && node.arguments[0].name === paramName
            }
            if (node.type === 'LogicalExpression') {
                return node.operator === operator &&
                    isOnlyParamInvocationsWithOperator(node.left, paramName, operator) &&
                    isOnlyParamInvocationsWithOperator(node.right, paramName, operator)
            }
        }

        function isCallToConditionMethod(node) {
            return conditionMethods.some(isCallToMethod.bind(null, node, settings.version))
        }

        function reportIfConnectiveOfParamInvocations(node) {
            const retVal = getValueReturnedInFirstLine(node)
            const paramName = getFirstParamName(node)
            if (retVal && retVal.type === 'LogicalExpression' && (retVal.operator === '&&' || retVal.operator === '||')) {
                if (isOnlyParamInvocationsWithOperator(retVal, paramName, retVal.operator)) {
                    context.report(node, message, reportConstants[retVal.operator])
                }
            }
        }

        function reportIfDoubleFilterLiteral(node) {
            if (onlyPassesIdentifier(node) && isObjectOfMethodCall(node) &&
                isCallToConditionMethod(node.parent.parent) && onlyPassesIdentifier(node.parent.parent)) {
                context.report(node, message, reportConstants['&&'])
            }
        }

        return {
            CallExpression: getLodashMethodVisitor(settings, (node, iteratee) => {
                if (isCallToConditionMethod(node)) {
                    reportIfConnectiveOfParamInvocations(iteratee)
                    reportIfDoubleFilterLiteral(node)
                }
            })
        }
    }
}