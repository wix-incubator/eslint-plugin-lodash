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
    var settings = require('../util/settingsUtil').getSettings(context);
    function onlyHasPush(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        var exp = func && func.type === 'ArrowFunctionExpression' ? firstLine : firstLine && firstLine.expression;
        return astUtil.hasOnlyOneStatement(func) && astUtil.getMethodName(exp) === 'push';
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node, iteratee) {
            if (lodashUtil.isCallToMethod(node, settings.version, 'forEach') && onlyHasPush(iteratee)) {
                context.report(node, 'Prefer _.map over a _.forEach with a push to an array inside');
            }
        })
    };
};
