/**
 * @fileoverview Rule to check if a call to filter should be a call to reject
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');
    var aliases = require('../util/aliases');

    function isFilter(node) {
        return aliases.isAliasOfMethod('filter', esUtil.getMethodName(node));
    }

    function isParamNegation(exp, firstParamName) {
        return exp && exp.type === 'UnaryExpression' && exp.operator === '!' && esUtil.isMemberExpOfArg(exp.argument, firstParamName);
    }

    function isParamNotEqEq(exp, firstParamName) {
        return exp && exp.type === 'BinaryExpression' && exp.operator === '!==' &&
            (esUtil.isMemberExpOfArg(exp.left, firstParamName) || esUtil.isMemberExpOfArg(exp.right, firstParamName));
    }

    function isNegativeExpressionFunction(func) {
        var firstLine = esUtil.getFirstFunctionLine(func);
        var firstParamName = esUtil.getFirstParamName(func);
        return esUtil.isReturnStatement(firstLine) &&
            (isParamNegation(firstLine.argument, firstParamName) ||
            isParamNotEqEq(firstLine.argument, firstParamName));
    }

    return {
        CallExpression: function (node) {
            if (isFilter(node) && isNegativeExpressionFunction(esUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.reject over negative condition');
            }

        }
    };
};
