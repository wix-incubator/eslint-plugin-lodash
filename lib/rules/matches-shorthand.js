/**
 * @fileoverview Rule to check if the matches shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var SUPPORT_MATCHES_STYLE_CB = ['find', 'detect', 'filter', 'select', 'reject', 'findIndex', 'findLastIndex', 'some', 'every'];
    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;

    var maxPropertyPathLength = parseInt(context.options[0], 10) || DEFAULT_MAX_PROPERTY_PATH_LENGTH;

    function shouldPreferMatches(func) {
        return astUtil.isConjunctionOfEqEqEqToParamMember(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), maxPropertyPathLength);
    }

    function methodSupportsShorthand(node) {
        return _.includes(SUPPORT_MATCHES_STYLE_CB, astUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            if (methodSupportsShorthand(node) && shouldPreferMatches(lodashUtil.getLodashIteratee(node))) {
                context.report(node.callee.property, 'Prefer matches syntax');
            }
        }
    };
};
