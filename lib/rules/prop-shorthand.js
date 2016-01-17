/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = function (context) {
    var _ = require('lodash');
    var aliasMap = require('../util/aliases');
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    function canUseShorthand(func) {
        return astUtil.isMemberExpOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), Number.MAX_VALUE, false);
    }

    function methodSupportsShorthand(node) {
        return _.includes(aliasMap.supportsProp, astUtil.getMethodName(node));
    }

    function usesPropShorthand(node) {
        var iteratee = lodashUtil.getLodashIteratee(node);
        return iteratee && iteratee.type === 'Literal' && !node.arguments[node.arguments.indexOf(iteratee) + 1];
    }

    var callExpressionVisitors = {
        always: function (node) {
            var iteratee = lodashUtil.getLodashIteratee(node);
            if (methodSupportsShorthand(node) && canUseShorthand(iteratee)) {
                context.report(iteratee, 'Prefer property shorthand syntax');
            }
        },
        never: function (node) {
            if (usesPropShorthand(node)) {
                context.report(lodashUtil.getLodashIteratee(node), 'Do not use property shorthand syntax');
            }
        }
    };

    return {
        CallExpression: callExpressionVisitors[context.options[0] || 'always']
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    }
];
