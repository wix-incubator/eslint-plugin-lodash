/**
 * @fileoverview Rule to check if the macthesProperty shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var SUPPORT_MATCHES_PROPERTY_STYLE_CB = ['find', 'detect', 'filter', 'select', 'reject', 'findIndex', 'findLastIndex', 'some', 'every'];

    function shouldPreferMatches(func) {
        return astUtil.isEqEqEqToParamMember(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), 1);
    }

    function methodSupportsShorthand(node) {
        return SUPPORT_MATCHES_PROPERTY_STYLE_CB.indexOf(astUtil.getMethodName(node)) !== -1;
    }

    function usesMatchesPropertySyntax(node) {
        var iteratee = lodashUtil.getLodashIteratee(node);
        return iteratee && iteratee.type === 'Literal' && node.arguments[node.arguments.indexOf(iteratee) + 1];
    }

    var callExpressionVisitors = {
        always: function (node) {
            if (methodSupportsShorthand(node) && shouldPreferMatches(lodashUtil.getLodashIteratee(node))) {
                context.report(node.callee.property, 'Prefer matches property syntax');
            }
        },
        never: function (node) {
            if (usesMatchesPropertySyntax(node)) {
                context.report(node.callee.property, 'Do not use matches property syntax');
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
