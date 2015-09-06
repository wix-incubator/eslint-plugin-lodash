/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    function onlyHasPush(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        var exp = func.type === 'ArrowFunctionExpression' ? firstLine : firstLine.expression;
        return astUtil.getMethodName(exp) === 'push';
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isCallToMethod(node, 'forEach') && onlyHasPush(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.map over a _.forEach with a push to an array inside');
            }
        }
    };
};
