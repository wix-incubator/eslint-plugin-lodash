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
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {getFirstFunctionLine, hasOnlyOneStatement, getMethodName, isFunctionDefinitionWithBlock} = require('../util/astUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')

        function onlyHasPush(func) {
            const firstLine = getFirstFunctionLine(func)
            const exp = func && !isFunctionDefinitionWithBlock(func) ? firstLine : firstLine && firstLine.expression
            return func && hasOnlyOneStatement(func) && getMethodName(exp) === 'push'
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'forEach', method) && onlyHasPush(iteratee)) {
                context.report(node, 'Prefer _.map over a _.forEach with a push to an array inside')
            }
        })
    }
}
