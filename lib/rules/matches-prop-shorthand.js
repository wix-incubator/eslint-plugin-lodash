/**
 * @fileoverview Rule to check if the macthesProperty shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var SUPPORT_MATCHES_PROPERTY_STYLE_CB = ['find', 'detect', 'filter', 'select', 'reject', 'findIndex', 'findLastIndex', 'some', 'every'];

    function shouldPreferMatches(func) {
        return astUtil.isEqEqEqToParamMember(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), 1);
    }

    function methodSupportsShorthand(node) {
        return _.includes(SUPPORT_MATCHES_PROPERTY_STYLE_CB, astUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            if (methodSupportsShorthand(node) && shouldPreferMatches(lodashUtil.getLodashIteratee(node))) {
                context.report(node.callee.property, 'Prefer matches property syntax');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
