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

    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;
    var maxPropertyPathLength = parseInt(context.options[0], 10) || DEFAULT_MAX_PROPERTY_PATH_LENGTH;

    function isIfWithoutElse(statement) {
        return statement && statement.type === 'IfStatement' && !statement.alternate;
    }

    function canBeShorthand(exp, paramName) {
        return astUtil.isIdentifierOfParam(exp, paramName) ||
            astUtil.isMemberExpOf(exp, paramName, maxPropertyPathLength) || astUtil.isNegationOfParamMember(exp, paramName, maxPropertyPathLength) ||
            astUtil.isEqEqEqToMemberOf(exp, paramName, maxPropertyPathLength) || astUtil.isNotEqEqToMemberOf(exp, paramName, maxPropertyPathLength);
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

module.exports.schema = [
    {
        type: 'integer'
    }
];