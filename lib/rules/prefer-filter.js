/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var aliases = require('../util/aliases');

    function isIfWithoutElse(statement) {
        return statement && statement.type === 'IfStatement' && !statement.alternate;
    }

    function canBeShorthand(exp, paramName) {
        return astUtil.isIdentifierOfParam(exp, paramName) || astUtil.isMemberExpOfArg(exp, paramName) || astUtil.isNegationOfParamMember(exp, paramName) ||
            astUtil.isEqEqEqToParamMember(exp, paramName) || astUtil.isNotEqEqToParamMember(exp, paramName);
    }

    function onlyHasSimplifiableIf(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        return astUtil.hasOnlyOneStatement(func) && func.params.length === 1 && isIfWithoutElse(firstLine) && canBeShorthand(firstLine.test, astUtil.getFirstParamName(func));
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isCallToMethod(node, 'forEach') && onlyHasSimplifiableIf(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.filter or _.some over an if statement inside a _.forEach');
            }
        }
    };
};
