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
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);


    function isFunctionMethodCallOfParam(func) {
        return astUtil.isCallFromObject(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func));
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(lodashPragma, function (node, iteratee) {
            if (lodashUtil.isCallToMethod(node, 'map') && isFunctionMethodCallOfParam(iteratee)) {
                context.report(node, 'Prefer _.invoke over map to a method call.');
            }
        })
    };
};
