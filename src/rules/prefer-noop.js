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
    create(context) {
        const {getFirstFunctionLine} = require('../util/astUtil')

        function reportIfEmptyFunction(node) {
            if (!getFirstFunctionLine(node) && node.parent.type !== 'MethodDefinition') {
                context.report(node, 'Prefer _.noop over an empty function')
            }
        }

        return {
            FunctionExpression: reportIfEmptyFunction,
            ArrowFunctionExpression: reportIfEmptyFunction
        }
    }
}
