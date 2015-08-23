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
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    function shouldPreferProp(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        return astUtil.isReturnStatement(firstLine) && astUtil.isMemberExpOfArg(firstLine.argument, astUtil.getFirstParamName(func));
    }

    function methodSupportsShorthand(node) {
        return _.includes(aliasMap.supportsProp, astUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            if (methodSupportsShorthand(node) && shouldPreferProp(lodashUtil.getLodashIteratee(node))) {
                context.report(node.callee.property, 'Prefer property shorthand syntax');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
