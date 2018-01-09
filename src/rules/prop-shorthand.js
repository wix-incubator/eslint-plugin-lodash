/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict'

/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------


module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prop-shorthand.md'
        },
        schema: [{
            enum: ['always', 'never']
        }]
    },

    create(context) {
        const {isCallToLodashMethod, getShorthandVisitors} = require('../util/lodashUtil')
        const {isMemberExpOf, getValueReturnedInFirstStatement, getFirstParamName} = require('../util/astUtil')

        function isExplicitParamFunction(func) {
            return isMemberExpOf(getValueReturnedInFirstStatement(func), getFirstParamName(func), {allowComputed: false})
        }

        function canUseShorthand(iteratee, lodashContext) {
            return isCallToLodashMethod(iteratee, 'property', lodashContext) || isExplicitParamFunction(iteratee)
        }

        function usesShorthand(node, iteratee) {
            return iteratee && iteratee.type === 'Literal' && !node.arguments[node.arguments.indexOf(iteratee) + 1]
        }

        return getShorthandVisitors(context, {
            canUseShorthand,
            usesShorthand
        }, {
            always: 'Prefer property shorthand syntax',
            never: 'Do not use property shorthand syntax'
        })
    }
}
