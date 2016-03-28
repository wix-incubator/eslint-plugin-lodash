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
    const DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3
    const maxPropertyPathLength = parseInt(context.options[0], 10) || DEFAULT_MAX_PROPERTY_PATH_LENGTH

    function isIfWithoutElse(statement) {
        return statement && statement.type === 'IfStatement' && !statement.alternate
    }

    function canBeShorthand(exp, paramName) {
        return astUtil.isIdentifierOfParam(exp, paramName) ||
            astUtil.isMemberExpOf(exp, paramName, maxPropertyPathLength) || astUtil.isNegationOfMemberOf(exp, paramName, maxPropertyPathLength) ||
            astUtil.isEqEqEqToMemberOf(exp, paramName, maxPropertyPathLength) || astUtil.isNotEqEqToMemberOf(exp, paramName, maxPropertyPathLength)
    }

    function onlyHasSimplifiableIf(func) {
        const firstLine = astUtil.getFirstFunctionLine(func)
        return func && astUtil.hasOnlyOneStatement(func) && func.params.length === 1 && isIfWithoutElse(firstLine) && canBeShorthand(firstLine.test, astUtil.getFirstParamName(func))
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, (node, iteratee) => {
            if (lodashUtil.isCallToMethod(node, settings.version, 'forEach') && onlyHasSimplifiableIf(iteratee)) {
                context.report(node, 'Prefer _.filter or _.some over an if statement inside a _.forEach')
            }
        })
    }
}

module.exports.schema = [
    {
        type: 'integer'
    }
]