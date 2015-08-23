/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var aliasMap = require('../util/aliases');
    var esUtil = require('../util/esUtil');

    function shouldPreferProp(func) {
        var firstLine = esUtil.getFirstFunctionLine(func);
        return esUtil.isReturnStatement(firstLine) && esUtil.isMemberExpOfArg(firstLine.argument, esUtil.getFirstParamName(func));
    }

    function methodSupportsShorthand(node) {
        return _.includes(aliasMap.supportsProp, esUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            try {
                if (methodSupportsShorthand(node) && shouldPreferProp(esUtil.getLodashIteratee(node))) {
                    context.report(node.callee.property, 'Prefer property shorthand syntax');
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
