/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)
    function onlyHasPush(func) {
        const firstLine = astUtil.getFirstFunctionLine(func)
        const exp = func && func.type === 'ArrowFunctionExpression' ? firstLine : firstLine && firstLine.expression
        return func && astUtil.hasOnlyOneStatement(func) && astUtil.getMethodName(exp) === 'push'
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, (node, iteratee) => {
            if (lodashUtil.isCallToMethod(node, settings.version, 'forEach') && onlyHasPush(iteratee)) {
                context.report(node, 'Prefer _.map over a _.forEach with a push to an array inside')
            }
        })
    }
}
