/**
 * @fileoverview Rule to check if the expression could be better expressed as a _.constant
 */
'use strict'

/**
 * @fileoverview Rule to check if the expression could be better expressed as a _.constant
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [{
            type: 'boolean'
        }, {
            type: 'boolean'
        }]
    },

    create(context) {
        const {getValueReturnedInFirstLine} = require('../util/astUtil')
        const shouldCheckArrowFunctions = context.options[0] !== undefined ? context.options[0] : true
        const shouldCheckFunctionDeclarations = context.options[1] !== undefined ? context.options[1] : false

        function isCompletelyLiteral(node) {
            switch (node.type) {
                case 'Literal':
                    return true
                case 'BinaryExpression':
                    return isCompletelyLiteral(node.left) && isCompletelyLiteral(node.right)
                case 'UnaryExpression':
                    return isCompletelyLiteral(node.argument)
                case 'ConditionalExpression':
                    return isCompletelyLiteral(node.test) && isCompletelyLiteral(node.consequent) && isCompletelyLiteral(node.alternate)
                default:
                    return false
            }
        }

        function reportIfLikeConstant(func, node) {
            const valueReturnedInFirstLine = func(node)
            if (valueReturnedInFirstLine && isCompletelyLiteral(valueReturnedInFirstLine)) {
                context.report(node, 'Prefer _.constant over a function returning a literal')
            }
        }

        function handleFunctionDefinition(node) {
            reportIfLikeConstant(getValueReturnedInFirstLine, node)
        }

        return {
            FunctionExpression: handleFunctionDefinition,
            FunctionDeclaration(node) {
                if (shouldCheckFunctionDeclarations) {
                    handleFunctionDefinition(node)
                }
            },
            ArrowFunctionExpression(node) {
                if (shouldCheckArrowFunctions) {
                    handleFunctionDefinition(node)
                }
            }
        }
    }
}
