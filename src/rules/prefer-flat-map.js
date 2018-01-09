/**
 * @fileoverview Rule to check if a call to map and flatten should be a call to _.flatMap
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to map and flatten should be a call to _.flatMap
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-flat-map.md'
        }
    },

    create(context) {
        const {getLodashMethodVisitors, isCallToMethod, isCallToLodashMethod} = require('../util/lodashUtil')
        const {getCaller} = require('../util/astUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')

        function isChainedMapFlatten(callType, node, version) {
            return callType === 'chained' && isCallToMethod(getCaller(node), version, 'map')
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version, callType, lodashContext}) => {
            if (isAliasOfMethod(version, 'flatten', method) &&
                (isChainedMapFlatten(callType, node, version) ||
                isCallToLodashMethod(node.arguments[0], 'map', lodashContext))) {
                context.report({node, message: 'Prefer _.flatMap over consecutive map and flatten.'})
            }
        })
    }
}
