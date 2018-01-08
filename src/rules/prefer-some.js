/**
 * @fileoverview Rule to check if a findIndex comparison should be a call to _.some
 */
'use strict'

/**
 * @fileoverview Rule to check if a findIndex comparison should be a call to _.some
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-some.md'
        },
        schema: [{
            type: 'object',
            properties: {
                includeNative: {
                    type: 'boolean'
                }
            }
        }]
    },

    create(context) {
        const includeNative = context.options[0] && context.options[0].includeNative
        const {getExpressionComparedToInt, isFindIndexCall} = require('../util/astUtil')
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')

        const visitors = getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'findIndex', method) && node === getExpressionComparedToInt(node.parent, -1, true)) {
                context.report({node, message: 'Prefer _.some over findIndex comparison to -1'})
            }
        })

        if (includeNative) {
            visitors.BinaryExpression = node => {
                if (isFindIndexCall(getExpressionComparedToInt(node, -1, true))) {
                    context.report({node, message: 'Prefer _.some over findIndex comparison to -1'})
                }
            }
        }
        return visitors
    }
}
