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
        schema: [{
            enum: ['always', 'never']
        }]
    },

    create(context) {
        const {isLodashCallToMethod, getShorthandVisitor} = require('../util/lodashUtil')
        const {isMemberExpOf, getValueReturnedInFirstStatement, getFirstParamName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)

        function isExplicitParamFunction(func) {
            return isMemberExpOf(getValueReturnedInFirstStatement(func), getFirstParamName(func), {allowComputed: false})
        }

        function canUseShorthand(iteratee) {
            return isLodashCallToMethod(iteratee, settings, 'property') || isExplicitParamFunction(iteratee)
        }

        function usesShorthand(node, iteratee) {
            return iteratee && iteratee.type === 'Literal' && !node.arguments[node.arguments.indexOf(iteratee) + 1]
        }

        return {
            CallExpression: getShorthandVisitor(context, settings, {
                canUseShorthand,
                usesShorthand
            }, {
                always: 'Prefer property shorthand syntax',
                never: 'Do not use property shorthand syntax'
            })
        }
    }
}
