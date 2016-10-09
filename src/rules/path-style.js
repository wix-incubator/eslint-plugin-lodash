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
        const {isCallToMethod, isLodashCall, getLodashMethodVisitor} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const objectPathMethods = {
            regular: {methods: ['get', 'has', 'hasIn', 'set', 'unset', 'invoke'], index: 1},
            higherOrder: {methods: ['property', 'matchesProperty'], index: 0}
        }
        const _ = require('lodash')


        function getIndexByMethodName(node) {
            return _.chain(objectPathMethods).find(type => type.methods.some(isCallToMethod.bind(null, node, settings.version)))
            .get('index', -1)
            .value()
        }

        function getPropertyPathNode(node) {
            const index = getIndexByMethodName(node)
            return node.arguments[isLodashCall(node, settings.pragma) ? index : index - 1]
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


        return {
            CallExpression: getLodashMethodVisitor(settings, node => {
                const propertyPathNode = getPropertyPathNode(node)
                if (propertyPathNode) {
                    reportIfViolates[context.options[0] || 'string'](propertyPathNode)
                }
            })
        }
    }
}