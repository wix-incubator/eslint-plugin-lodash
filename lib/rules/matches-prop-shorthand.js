/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var SUPPORT_MATCHES = ['find', 'detect', 'filter', 'select', 'reject'];

    function shouldPreferMatches(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        return astUtil.isReturnStatement(firstLine) && astUtil.isEqEqEqToParamMember(firstLine.argument, astUtil.getFirstParamName(func));
    }

    function methodSupportsShorthand(node) {
        return _.includes(SUPPORT_MATCHES, astUtil.getMethodName(node));
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
