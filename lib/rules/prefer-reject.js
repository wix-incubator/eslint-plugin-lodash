/**
 * @fileoverview Rule to check if a call to filter should be a call to reject
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var aliases = require('../util/aliases');

    function isFilter(node) {
        return aliases.isAliasOfMethod('filter', astUtil.getMethodName(node));
    }

    function isParamNegation(exp, firstParamName) {
        return exp && exp.type === 'UnaryExpression' && exp.operator === '!' && astUtil.isMemberExpOfArg(exp.argument, firstParamName);
    }

    function isParamNotEqEq(exp, firstParamName) {
        return exp && exp.type === 'BinaryExpression' && exp.operator === '!==' &&
            (astUtil.isMemberExpOfArg(exp.left, firstParamName) || astUtil.isMemberExpOfArg(exp.right, firstParamName));
    }

    function isNegativeExpressionFunction(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        var firstParamName = astUtil.getFirstParamName(func);
        return astUtil.isReturnStatement(firstLine) &&
            (isParamNegation(firstLine.argument, firstParamName) ||
            isParamNotEqEq(firstLine.argument, firstParamName));
    }

    return {
        CallExpression: function (node) {
            if (isFilter(node) && isNegativeExpressionFunction(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.reject over negative condition');
            }

        }
    };
};
