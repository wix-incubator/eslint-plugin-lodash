/**
 * @fileoverview Rule to check if the identity shorthand can be used
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


    function isExplicitIdentityFunction(iteratee) {
        var firstParamName = astUtil.getFirstParamName(iteratee);
        return firstParamName && _.get(astUtil.getValueReturnedInFirstLine(iteratee), 'name') === firstParamName;
    }

    var isLodashIdentityFunction = _.matches({
        type: 'MemberExpression',
        object: {name: settings.pragma},
        property: {name: 'identity'}
    });

    var canUseIdentityShorthand = _.overSome(isExplicitIdentityFunction, isLodashIdentityFunction);

    function usesShorthand(node, iteratee) {
        return lodashUtil.methodSupportsShorthand(settings.version, node) && !iteratee;
    }

    return {
        CallExpression: lodashUtil.getShorthandVisitor(context, settings, {
            canUseShorthand: canUseIdentityShorthand,
            usesShorthand: usesShorthand
        }, {
            always: 'Prefer omitting the iteratee over a function that returns its argument',
            never: 'Do not use the identity shorthand syntax'
        })
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    }
];
