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
    var settings = require('../util/settingsUtil').getSettings(context);
    var SUPPORT_MATCHES_PROPERTY_STYLE_CB = ['find', 'detect', 'filter', 'select', 'reject', 'findIndex', 'findLastIndex', 'some', 'every'];

    function shouldPreferMatches(func) {
        return astUtil.isEqEqEqToMemberOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), Infinity);
    }

    function methodSupportsShorthand(node) {
        return SUPPORT_MATCHES_PROPERTY_STYLE_CB.indexOf(astUtil.getMethodName(node)) !== -1;
    }

    var matchesPropertyChecks = {
        3: function (node, iteratee) {
            return iteratee && iteratee.type === 'Literal' && node.arguments[node.arguments.indexOf(iteratee) + 1];
        },
        4: function (node, iteratee) {
            return iteratee && iteratee.type === 'ArrayExpression';
        }
    };


    var callExpressionReporters = {
        always: function (node, iteratee) {
            if (methodSupportsShorthand(node) && shouldPreferMatches(iteratee)) {
                context.report(node.callee.property, 'Prefer matches property syntax');
            }
        },
        never: function (node, iteratee) {
            if (matchesPropertyChecks[settings.version](node, iteratee)) {
                context.report(node.callee.property, 'Do not use matches property syntax');
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
    }
];
