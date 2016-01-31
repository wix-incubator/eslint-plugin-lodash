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
    var settingsUtil = require('../util/settingsUtil');
    var settings = settingsUtil.getSettings(context);
    var SUPPORT_MATCHES_STYLE_CB = ['find', 'detect', 'filter', 'select', 'reject', 'findIndex', 'findLastIndex', 'some', 'every'];
    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;

    function isConjunction(exp) {
        return exp && exp.type === 'LogicalExpression' && exp.operator === '&&';
    }

    function canBeObjectLiteralWithShorthandProperty(node, paramName) {
        return settingsUtil.isEcmaFeatureOn(context, 'objectLiteralShorthandProperties') && astUtil.isEqEqEq(node) &&
            (astUtil.isMemberExpOf(node.left, paramName, 1) && node.left.property.type === 'Identifier' && node.right.type === 'Identifier' && node.left.property.name === node.right.name ||
            astUtil.isMemberExpOf(node.right, paramName, 1) && node.right.property.type === 'Identifier' && node.left.type === 'Identifier' && node.right.property.name === node.left.name);
    }

    function isConjunctionOfEqEqEqToMemberOf(exp, paramName, maxPropertyPathLength) {
        var allowComputed = context.options[2] && settingsUtil.isEcmaFeatureOn(context, 'objectLiteralComputedProperties');
        if (isConjunction(exp) || canBeObjectLiteralWithShorthandProperty(exp, paramName)) {
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
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, callExpressionReporters[context.options[0] || 'always'])
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
