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

    function isNegativeExpressionFunction(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        var firstParamName = astUtil.getFirstParamName(func);
        return astUtil.isReturnStatement(firstLine) &&
            (astUtil.isNegationOfParamMember(firstLine.argument, firstParamName) ||
            astUtil.isNotEqEqToParamMember(firstLine.argument, firstParamName));
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isFilter(node) && isNegativeExpressionFunction(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.reject over negative condition');
            }

        }
    };
};
