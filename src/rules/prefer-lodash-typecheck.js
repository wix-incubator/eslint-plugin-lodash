/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict'

/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getIsTypeMethod} = require('../util/lodashUtil')

        const otherSides = {
            left: 'right',
            right: 'left'
        }

        function isTypeOf(node) {
            return node && node.type === 'UnaryExpression' && node.operator === 'typeof'
        }

        function isStrictComparison(node) {
            return node.operator === '===' || node.operator === '!=='
        }

        function getValueForSide(node, side) {
            const otherSide = otherSides[side]
            if (isTypeOf(node[side]) && (node[otherSide].value !== 'undefined' || node[side].argument.type !== 'Identifier')) {
                return node[otherSide].value
            }
        }

        function getTypeofCompareType(node) {
            if (isStrictComparison(node)) {
                return getValueForSide(node, 'left') || getValueForSide(node, 'right')
            }
        }

        const REPORT_MESSAGE = 'Prefer \'_.{{method}}\' over {{actual}}.'

        return {
            BinaryExpression(node) {
                const typeofCompareType = getTypeofCompareType(node)
                if (typeofCompareType) {
                    context.report(node, REPORT_MESSAGE, {
                        method: getIsTypeMethod(typeofCompareType),
                        actual: '\'typeof\' comparison'
                    })
                } else if (node.operator === 'instanceof') {
                    const lodashEquivalent = getIsTypeMethod(node.right.name)
                    if (node.right.type === 'Identifier' && lodashEquivalent) {
                        context.report(node, REPORT_MESSAGE, {method: lodashEquivalent, actual: `'instanceof ${node.right.name}'`})
                    }
                }
            }
        }
    }
}
