/**
 * @fileoverview Rule to check if the identity shorthand can be used
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = function (context) {
    const [get, matches, overSome] = ['get', 'matches', 'overSome'].map(m => require(`lodash/${m}`))
    const {methodSupportsShorthand, getShorthandVisitor} = require('../util/lodashUtil')
    const {getFirstParamName, getValueReturnedInFirstLine} = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)


    function isExplicitIdentityFunction(iteratee) {
        const firstParamName = getFirstParamName(iteratee)
        return firstParamName && get(getValueReturnedInFirstLine(iteratee), 'name') === firstParamName
    }

    const isLodashIdentityFunction = matches({
        type: 'MemberExpression',
        object: {name: settings.pragma},
        property: {name: 'identity'}
    })

    const canUseShorthand = overSome(isExplicitIdentityFunction, isLodashIdentityFunction)

    function usesShorthand(node, iteratee) {
        return methodSupportsShorthand(settings.version, node) && !iteratee
    }

    return {
        CallExpression: getShorthandVisitor(context, settings, {
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
