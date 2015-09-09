/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var REPORT_MESSAGE = 'Prefer \'_.{{method}}\' over the native function.';

    return {
        CallExpression: function (node) {
            if (!lodashUtil.isLodashCall(node) && !lodashUtil.isLodashWrapper(astUtil.getCaller(node)) && lodashUtil.canBeLodashMethod(astUtil.getMethodName(node))) {
                context.report(node, REPORT_MESSAGE, {method: astUtil.getMethodName(node)});
            }
        }
    };
};
