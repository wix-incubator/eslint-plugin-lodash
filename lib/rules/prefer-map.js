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
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);


    function onlyHasPush(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        var exp = func && func.type === 'ArrowFunctionExpression' ? firstLine : firstLine && firstLine.expression;
        return astUtil.hasOnlyOneStatement(func) && astUtil.getMethodName(exp) === 'push';
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(lodashPragma, function (node, iteratee) {
            if (lodashUtil.isCallToMethod(node, 'forEach') && onlyHasPush(iteratee)) {
                context.report(node, 'Prefer _.map over a _.forEach with a push to an array inside');
            }
        })
    };
};
