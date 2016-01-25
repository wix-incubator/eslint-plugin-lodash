/**
 * @fileoverview Rule to check if a call to filter should be a call to reject
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;
    var maxPropertyPathLength = parseInt(context.options[0], 10) || DEFAULT_MAX_PROPERTY_PATH_LENGTH;

    function isNegativeExpressionFunction(func) {
        var returnValue = astUtil.getValueReturnedInFirstLine(func);
        var firstParamName = astUtil.getFirstParamName(func);
        return astUtil.isNegationOfParamMember(returnValue, firstParamName, maxPropertyPathLength) ||
            astUtil.isNotEqEqToMemberOf(returnValue, firstParamName, maxPropertyPathLength);
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node, iteratee) {
            if (lodashUtil.isCallToMethod(node, settings.version, 'filter') && isNegativeExpressionFunction(iteratee)) {
                context.report(node, 'Prefer _.reject over negative condition');
            }
        })
    };
};

module.exports.schema = [
    {
        type: 'integer'
    }
];