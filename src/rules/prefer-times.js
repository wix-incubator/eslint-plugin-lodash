/**
 * @fileoverview Rule to check if a call to map should be a call to times
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-times.md'
        }
    },

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')
        const get = require('lodash/get')
        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'map', method) && get(iteratee, 'params.length') === 0) {
                context.report({node, message: 'Prefer _.times over _.map without using arguments'})
            }
        })
    }
}
