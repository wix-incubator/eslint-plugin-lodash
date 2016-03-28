/**
 * @fileoverview Rule to check if a _.filter condition or multiple filters should be _.overEvery or _.overSome
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    var conditionMethods = ['filter', 'reject', 'pickBy', 'omitBy', 'findIndex', 'findLastIndex', 'find', 'findLast', 'findKey', 'findLastKey'];
    var message = 'Prefer _.{{method}} instead of a {{connective}}';

    var reportConstants = {
        '&&': {
            method: 'overEvery',
            connective: 'conjunction'
        },
        '||': {
            method: 'overSome',
            connective: 'disjunction'
        }
    };

    function onlyPassesIdentifier(node) {
        return node.arguments.length === 1 && node.arguments[0].type === 'Identifier';
    }


    function isOnlyParamInvocationsWithOperator(node, paramName, operator) {
        if (node.type === 'CallExpression') {
            return onlyPassesIdentifier(node) && node.arguments[0].name === paramName;
        }
        if (node.type === 'LogicalExpression') {
            return node.operator === operator &&
                isOnlyParamInvocationsWithOperator(node.left, paramName, operator) &&
                isOnlyParamInvocationsWithOperator(node.right, paramName, operator);
        }
    }

    function isCallToConditionMethod(node) {
        return conditionMethods.some(lodashUtil.isCallToMethod.bind(null, node, settings.version));
    }

    function reportIfConnectiveOfParamInvocations(node) {
        var retVal = astUtil.getValueReturnedInFirstLine(node);
        var paramName = astUtil.getFirstParamName(node);
        if (retVal && retVal.type === 'LogicalExpression' && (retVal.operator === '&&' || retVal.operator === '||')) {
            if (isOnlyParamInvocationsWithOperator(retVal, paramName, retVal.operator)) {
                context.report(node, message, reportConstants[retVal.operator]);
            }
        }
    }

    function reportIfDoubleFilterLiteral(node) {
        if (onlyPassesIdentifier(node) && astUtil.isObjectOfMethodCall(node) &&
            isCallToConditionMethod(node.parent.parent) && onlyPassesIdentifier(node.parent.parent)) {
            context.report(node, message, reportConstants['&&']);
        }
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node, iteratee) {
            if (isCallToConditionMethod(node)) {
                reportIfConnectiveOfParamInvocations(iteratee);
                reportIfDoubleFilterLiteral(node);
            }
        })
    };
};