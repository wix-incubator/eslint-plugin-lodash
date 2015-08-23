/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var esUtil = require('../util/esUtil');

    var SUPPORT_MATCHES = ['find', 'detect', 'filter', 'select', 'reject'];

    function isParamEqEqEq(exp, paramName) {
        return exp.type === 'BinaryExpression' && exp.operator === '===' &&
            (esUtil.isMemberExpOfArg(exp.left, paramName) ||
            esUtil.isMemberExpOfArg(exp.right, paramName));
    }

    function shouldPreferMatches(func) {
        var firstLine = esUtil.getFirstFunctionLine(func);
        return esUtil.isReturnStatement(firstLine) && isParamEqEqEq(firstLine.argument, esUtil.getFirstParamName(func));
    }

    function methodSupportsShorthand(node) {
        return _.includes(SUPPORT_MATCHES, esUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            try {
                if (methodSupportsShorthand(node) && shouldPreferMatches(esUtil.getLodashIteratee(node))) {
                    context.report(node.callee.property, 'Prefer matches property syntax');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
