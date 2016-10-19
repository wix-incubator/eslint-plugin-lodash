/**
 * @fileoverview Rule to check if the identity shorthand can be used
 */
'use strict'

/**
 * @fileoverview Rule to check if the identity shorthand can be used
 */
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = {
    meta: {
        schema: [{
            enum: ['always', 'never']
        }]
    },

    create(context) {
        const [get, matches, overSome] = ['get', 'matches', 'overSome'].map(m => require(`lodash/${m}`))
        const {methodSupportsShorthand, getShorthandVisitors} = require('../util/lodashUtil')
        const {getFirstParamName, getValueReturnedInFirstStatement} = require('../util/astUtil')

        function isExplicitIdentityFunction(iteratee) {
            const firstParamName = getFirstParamName(iteratee)
            return firstParamName && get(getValueReturnedInFirstStatement(iteratee), 'name') === firstParamName
        }

        function canUseShorthand(iteratee, lodashContext) {
            return isExplicitIdentityFunction(iteratee) || lodashContext.getLodashMethod(iteratee) === 'identity'
        }

        function usesShorthand(node, iteratee, {method, version}) {
            return methodSupportsShorthand(version, method) && !iteratee
        }

        return getShorthandVisitors(context, {
            canUseShorthand,
            usesShorthand
        }, {
            always: 'Prefer omitting the iteratee over a function that returns its argument',
            never: 'Do not use the identity shorthand syntax'
        })

    }
}
