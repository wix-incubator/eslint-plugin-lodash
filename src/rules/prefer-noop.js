/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const getDocsUrl = require('../util/getDocsUrl')

module.exports = {
    meta: {
        type: 'problem',
        schema: [
            {
                type: 'object',
                properties: {
                    ifContainsComment: {
                        type: 'boolean'
                    }
                }
            }
        ],
        docs: {
            url: getDocsUrl('prefer-noop')
        }
    },

    create(context) {
        const {getFirstFunctionLine} = require('../util/astUtil')
        const ifContainsComment = context.options[0] && context.options[0].ifContainsComment

        function containsComment(node) {
            const code = context.getSourceCode()
            const comments = code.getCommentsInside(node)
            return comments.length > 0
        }

        function reportIfEmptyFunction(node) {
            if (node.parent.type === 'MethodDefinition' || node.generator || node.async) {
                return
            }

            if (getFirstFunctionLine(node)) {
                return
            }

            if (ifContainsComment && containsComment(node)) {
                return
            }

            context.report({node, message: 'Prefer _.noop over an empty function'})
        }

        return {
            FunctionExpression: reportIfEmptyFunction,
            ArrowFunctionExpression: reportIfEmptyFunction
        }
    }
}
