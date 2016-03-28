/**
 * @fileoverview Rule to check if the expression could be better expressed as a _.constant
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const astUtil = require('../util/astUtil')
    const shouldCheckArrowFunctions = context.options[0] !== undefined ? context.options[0] : true

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

    function handleFunctionExpression(node) {
        const valueReturnedInFirstLine = astUtil.getValueReturnedInFirstLine(node)
        if (valueReturnedInFirstLine && isCompletelyLiteral(valueReturnedInFirstLine)) {
            context.report(node, 'Prefer _.constant over a function returning a literal')
        }
    }

    return {
        FunctionExpression: handleFunctionExpression,
        ArrowFunctionExpression(node) {
            if (shouldCheckArrowFunctions) {
                handleFunctionExpression(node)
            }
        }
    }
}

module.exports.schema = [
    {
        type: 'boolean'
    }
]