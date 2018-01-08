/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
'use strict'

/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            url: 'https://github.com/wix/eslint-plugin-lodash/tree/master/docs/rules/prefer-noop.md'
        }
    },

    create(context) {
        const {getFirstFunctionLine} = require('../util/astUtil')

        function reportIfEmptyFunction(node) {
            if (!getFirstFunctionLine(node) && node.parent.type !== 'MethodDefinition' && !node.generator && !node.async) {
                context.report({node, message: 'Prefer _.noop over an empty function'})
            }
        }

        return {
            FunctionExpression: reportIfEmptyFunction,
            ArrowFunctionExpression: reportIfEmptyFunction
        }
    }
}
