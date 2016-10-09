/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
'use strict'

/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [{
            enum: ['as-needed', 'array', 'string']
        }]
    },

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')
        const objectPathMethods = {
            regular: {methods: ['get', 'has', 'hasIn', 'set', 'unset', 'invoke'], index: 1},
            higherOrder: {methods: ['property', 'matchesProperty'], index: 0}
        }
        const _ = require('lodash')


        function getIndexByMethodName(method, version) {
            const isAliasOfSuspect = m => isAliasOfMethod(version, m, method)
            const pathMethodGroup = _.find(objectPathMethods, type => _.some(type.methods, isAliasOfSuspect))
            return pathMethodGroup ? pathMethodGroup.index : -1
        }

        function getPropertyPathNode(node, method, version, callType) {
            const index = getIndexByMethodName(method, version)
            return node.arguments[callType === 'chained' ? index - 1 : index]
        }

        function isLiteralComplexPath(node) {
            return node.type === 'Literal' && _.isString(node.value) && /[\.\[]/.test(node.value)
        }

        function isShallowPathInArray(node) {
            return node.type === 'ArrayExpression' && node.elements.length === 1
        }

        function reportMessage(message) {
            return function (node) {
                context.report(node, message)
            }
        }

        const reportIfViolates = {
            'as-needed': _.cond([
                [isLiteralComplexPath, reportMessage('Use an array for deep paths')],
                [isShallowPathInArray, reportMessage('Use a string for single-level paths')]
            ]),
            array: _.cond([
                [_.matches({type: 'Literal'}), reportMessage('Use an array for paths')]
            ]),
            string: _.cond([
                [_.matches({type: 'ArrayExpression'}), reportMessage('Use a string for paths')]
            ])
        }


        return getLodashMethodVisitors(context, (node, iteratee, {method, version, callType}) => {
            const propertyPathNode = getPropertyPathNode(node, method, version, callType)
            if (propertyPathNode) {
                reportIfViolates[context.options[0] || 'string'](propertyPathNode)
            }
        })
    }
}