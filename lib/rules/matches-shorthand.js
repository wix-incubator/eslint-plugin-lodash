/**
 * @fileoverview Rule to check if the matches shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var SUPPORT_MATCHES_STYLE_CB = ['find', 'detect', 'filter', 'select', 'reject', 'findIndex', 'findLastIndex', 'some', 'every'];
    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;

    function isConjunction(exp) {
        return exp && exp.type === 'LogicalExpression' && exp.operator === '&&';
    }

    function isConjunctionOfEqEqEqToMemberOf(exp, paramName, maxPropertyPathLength) {
        if (exp) {
            var checkStack = [exp];
            var curr;
            var allParamMemberEq = true;
            curr = checkStack.pop();
            while (curr) {
                if (isConjunction(curr)) {
                    checkStack.push(curr.left, curr.right);
                } else if (!astUtil.isEqEqEqToParamMember(curr, paramName, maxPropertyPathLength)) {
                    allParamMemberEq = false;
                }
                curr = checkStack.pop();
            }
            return allParamMemberEq;
        }
    }

    function shouldPreferMatches(func) {
        var maxPropertyPathLength = parseInt(context.options[1], 10) || DEFAULT_MAX_PROPERTY_PATH_LENGTH;
        return isConjunctionOfEqEqEqToMemberOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), maxPropertyPathLength);
    }

    function methodSupportsShorthand(node) {
        return SUPPORT_MATCHES_STYLE_CB.indexOf(astUtil.getMethodName(node)) !== -1;
    }

    function usesMatchesShorthand(node) {
        var iteratee = lodashUtil.getLodashIteratee(node);
        return iteratee && iteratee.type === 'ObjectExpression';

    }

    var callExpressionVisitors = {
        always: function (node) {
            if (methodSupportsShorthand(node) && shouldPreferMatches(lodashUtil.getLodashIteratee(node))) {
                context.report(node.callee.property, 'Prefer matches syntax');
            }
        },
        never: function (node) {
            if (usesMatchesShorthand(node)) {
                context.report(node.callee.property, 'Do not use matches syntax');
            }
        }
    };

    return {
        CallExpression: callExpressionVisitors[context.options[0] || 'always']
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    }
];