/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);

    function isExplicitParamFunction(func) {
        return astUtil.isMemberExpOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), Number.MAX_VALUE, false);
    }

    function isCallToProperty(node) {
        return lodashUtil.isLodashCall(node, settings.pragma) && lodashUtil.isCallToMethod(node, settings.version, 'property');
    }

    function canUseShorthand(node) {
        return isCallToProperty(node) || isExplicitParamFunction(node);
    }

    function usesShorthand(node, iteratee) {
        return iteratee && iteratee.type === 'Literal' && !node.arguments[node.arguments.indexOf(iteratee) + 1];
    }

    return {
        CallExpression: lodashUtil.getShorthandVisitor(context, settings, {
            canUseShorthand: canUseShorthand,
            usesShorthand: usesShorthand
        }, {
            always: 'Prefer property shorthand syntax',
            never: 'Do not use property shorthand syntax'
        })
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    }
];
