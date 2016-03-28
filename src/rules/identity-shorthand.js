/**
 * @fileoverview Rule to check if the identity shorthand can be used
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = function (context) {
    const _ = require('lodash')
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)


    function isExplicitIdentityFunction(iteratee) {
        const firstParamName = astUtil.getFirstParamName(iteratee)
        return firstParamName && _.get(astUtil.getValueReturnedInFirstLine(iteratee), 'name') === firstParamName
    }

    const isLodashIdentityFunction = _.matches({
        type: 'MemberExpression',
        object: {name: settings.pragma},
        property: {name: 'identity'}
    })

    const canUseShorthand = _.overSome(isExplicitIdentityFunction, isLodashIdentityFunction)

    function usesShorthand(node, iteratee) {
        return lodashUtil.methodSupportsShorthand(settings.version, node) && !iteratee
    }

    return {
        CallExpression: lodashUtil.getShorthandVisitor(context, settings, {
            canUseShorthand,
            usesShorthand
        }, {
            always: 'Prefer omitting the iteratee over a function that returns its argument',
            never: 'Do not use the identity shorthand syntax'
        })
    }
}

module.exports.schema = [
    {
        enum: ['always', 'never']
    }
]
