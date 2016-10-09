/**
 * @fileoverview Rule to enforce usage of collection method values
 */
'use strict'

/**
 * @fileoverview Rule to enforce usage of collection method values
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
    create(context) {
        const {isChainBreaker, getLodashMethodVisitors} = require('../util/lodashUtil')
        const {getMethodName} = require('../util/astUtil')
        const {getCollectionMethods, isAliasOfMethod, getSideEffectIterationMethods} = require('../util/methodDataUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const includes = require('lodash/includes')

        function parentUsesValue(node, callType) {
            const isBeforeChainBreaker = callType === 'chained' && isChainBreaker(node.parent.parent, settings.version)
            return (isBeforeChainBreaker ? node.parent.parent : node).parent.type !== 'ExpressionStatement'
        }

        function isPureLodashCollectionMethod(method, version) {
            return includes(getCollectionMethods(version), method) && !isAliasOfMethod(version, 'remove', method)
        }

        function isSideEffectIterationMethod(method, version) {
            return includes(getSideEffectIterationMethods(version), method)
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version, callType}) => {
            if (isPureLodashCollectionMethod(method, version) && !parentUsesValue(node, callType)) {
                context.report(node, `Use value returned from _.${method}`)
            } else if (isSideEffectIterationMethod(method, version) && parentUsesValue(node, callType)) {
                context.report(node, `Do not use value returned from _.${getMethodName(node)}`)
            }
        })
    }
}
