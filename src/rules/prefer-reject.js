/**
 * @fileoverview Rule to check if a call to filter should be a call to reject
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

    function isNegativeExpressionFunction(func) {
        const returnValue = astUtil.getValueReturnedInFirstLine(func)
        const firstParamName = astUtil.getFirstParamName(func)
        return astUtil.isNegationOfMemberOf(returnValue, firstParamName, maxPropertyPathLength) ||
            astUtil.isNotEqEqToMemberOf(returnValue, firstParamName, maxPropertyPathLength) || lodashUtil.isLodashCallToMethod(func, settings, 'negate')
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, (node, iteratee) => {
            if (lodashUtil.isCallToMethod(node, settings.version, 'filter') && isNegativeExpressionFunction(iteratee)) {
                context.report(node, 'Prefer _.reject over negative condition')
            }
        })
    }
}

module.exports.schema = [
    {
        type: 'integer'
    }
]