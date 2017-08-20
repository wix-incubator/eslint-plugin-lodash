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
        const find = require('lodash/find')
        const findIndex = require('lodash/findIndex')
        const some = require('lodash/some')
        const every = require('lodash/every')
        const get = require('lodash/get')
        const matches = require('lodash/matches')
        const isPropAccess = x => x === '.' || x === '['

        function endsWithPropAccess(str) {
            return isPropAccess(str[str.length - 1])
        }

        function startsWithPropAccess(str) {
            return isPropAccess(str[0])
        }

        function getIndexByMethodName(method, version) {
            const isAliasOfSuspect = m => isAliasOfMethod(version, m, method)
            const pathMethodGroup = find(objectPathMethods, type => some(type.methods, isAliasOfSuspect))
            return pathMethodGroup ? pathMethodGroup.index : -1
        }

        function getPropertyPathNode(node, method, version, callType) {
            const index = getIndexByMethodName(method, version)
            return node.arguments[callType === 'chained' ? index - 1 : index]
        }

        const isArrayExpression = matches({type: 'ArrayExpression'})
        const isLiteral = matches({type: 'Literal'})
        const isAddition = matches({type: 'BinaryExpression', operator: '+'})
        const isTemplateLiteral = matches({type: 'TemplateLiteral'})

        function isArrayOfLiterals(node) {
            return isArrayExpression(node) && every(node.elements, isLiteral)
        }

        function isAdjacentToPropAccessInTemplate(exp, literal) {
            const quasiAfterIndex = findIndex(literal.quasis, quasi => quasi.start > exp.end)
            const quasiBefore = literal.quasis[quasiAfterIndex - 1]
            const quasiAfter = literal.quasis[quasiAfterIndex]
            return (quasiBefore && endsWithPropAccess(quasiBefore.value.raw)) ||
                (quasiAfter && startsWithPropAccess(quasiAfter.value.raw))
        }

        function isTemplateStringWithVariableProps(node) {
            return isTemplateLiteral(node) && some(node.expressions, exp => isAdjacentToPropAccessInTemplate(exp, node))
        }

        function isStringConcatWithVariableProps(node) {
            return isAddition(node) &&
                ((isLiteral(node.left) && endsWithPropAccess(node.left.value)) ||
                (isLiteral(node.right) && startsWithPropAccess(node.right.value)))
        }

        function isPathStringWithVariableProps(node) {
            return isTemplateStringWithVariableProps(node) || isStringConcatWithVariableProps(node)
        }

        const reportIfViolates = {
            'as-needed'(node) {
                if (isArrayOfLiterals(node)) {
                    context.report({node, message: 'Use a string for simple paths'})
                } else if (isPathStringWithVariableProps(node)) {
                    context.report({node, message: 'Use an array for paths with variables'})
                }
            },
            array(node) {
                if (isLiteral(node)) {
                    context.report({node, message: 'Use an array for paths'})
                }
            },
            string(node) {
                if (isArrayExpression(node)) {
                    context.report({node, message: 'Use a string for paths'})
                }
            }
        }


        return getLodashMethodVisitors(context, (node, iteratee, {method, version, callType}) => {
            const propertyPathNode = getPropertyPathNode(node, method, version, callType)
            if (propertyPathNode) {
                reportIfViolates[context.options[0] || 'as-needed'](propertyPathNode)
            }
        })
    }
}