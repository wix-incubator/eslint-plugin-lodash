/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getLodashMethodVisitor, isCallToMethod} = require('../util/lodashUtil')
        const {getFirstFunctionLine, hasOnlyOneStatement, getMethodName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        function onlyHasPush(func) {
            const firstLine = getFirstFunctionLine(func)
            const exp = func && func.type === 'ArrowFunctionExpression' ? firstLine : firstLine && firstLine.expression
            return func && hasOnlyOneStatement(func) && getMethodName(exp) === 'push'
        }

        return {
            CallExpression: getLodashMethodVisitor(settings, (node, iteratee) => {
                if (isCallToMethod(node, settings.version, 'forEach') && onlyHasPush(iteratee)) {
                    context.report(node, 'Prefer _.map over a _.forEach with a push to an array inside')
                }
            })
        }
    }
}
