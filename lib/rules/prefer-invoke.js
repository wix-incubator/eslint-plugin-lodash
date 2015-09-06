/**
 * @fileoverview Rule to check if a call to map should be a call to invoke
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    function isFunctionMethodCallOfParam(func) {
        return astUtil.isCallFromObject(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func));
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isCallToMethod(node, 'map') && isFunctionMethodCallOfParam(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.invoke over map to a method call.');
            }
        }
    };
};
