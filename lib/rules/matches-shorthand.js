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
        var allowComputed = context.options[2] && context.ecmaFeatures.objectLiteralComputedProperties;
        if (exp) {
            var checkStack = [exp];
            var curr;
            var allParamMemberEq = true;
            curr = checkStack.pop();
            while (curr) {
                if (isConjunction(curr)) {
                    checkStack.push(curr.left, curr.right);
                } else if (!astUtil.isEqEqEqToMemberOf(curr, paramName, maxPropertyPathLength, allowComputed)) {
                    allParamMemberEq = false;
                }
                curr = checkStack.pop();
            }
            return allParamMemberEq;
        }
    }

    function shouldPreferMatches(func) {
        var maxPropertyPathLength = context.options[1] || DEFAULT_MAX_PROPERTY_PATH_LENGTH;
        return isConjunctionOfEqEqEqToMemberOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), maxPropertyPathLength);
    }

    function methodSupportsShorthand(node) {
        return SUPPORT_MATCHES_STYLE_CB.indexOf(astUtil.getMethodName(node)) !== -1;
    }

    var callExpressionReporters = {
        always: function (node, iteratee) {
            if (methodSupportsShorthand(node) && shouldPreferMatches(iteratee)) {
                context.report(iteratee, 'Prefer matches syntax');
            }
        },
        never: function (node, iteratee) {
            if (iteratee && iteratee.type === 'ObjectExpression') {
                context.report(iteratee, 'Do not use matches syntax');
            }
        }
    };

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(callExpressionReporters[context.options[0] || 'always'])
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    },
    {
        type: 'integer',
        minimum: 1
    }, {
        type: 'boolean'
    }
];
