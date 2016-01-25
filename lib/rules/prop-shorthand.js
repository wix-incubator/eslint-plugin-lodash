/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = function (context) {
    var _ = require('lodash');
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);

    var supportsProp = require('../util/methodDataUtil').getPropShorthandMethods(settings.version);
    function canUseShorthand(func) {
        return astUtil.isMemberExpOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), Number.MAX_VALUE, false);
    }

    function methodSupportsShorthand(node) {
        return _.includes(supportsProp, astUtil.getMethodName(node));
    }

    function usesPropShorthand(node, iteratee) {
        return iteratee && iteratee.type === 'Literal' && !node.arguments[node.arguments.indexOf(iteratee) + 1];
    }

    var callExpressionReporters = {
        always: function (node, iteratee) {
            if (methodSupportsShorthand(node) && canUseShorthand(iteratee)) {
                context.report(iteratee, 'Prefer property shorthand syntax');
            }
        },
        never: function (node, iteratee) {
            if (usesPropShorthand(node, iteratee)) {
                context.report(iteratee, 'Do not use property shorthand syntax');
            }
        }
    };

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, callExpressionReporters[context.options[0] || 'always'])
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    }
];
