/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const astUtil = require('../util/astUtil')

    function reportIfEmptyFunction(node) {
        if (!astUtil.getFirstFunctionLine(node)) {
            context.report(node, 'Prefer _.noop over an empty function')
        }
    }

    return {
        FunctionExpression: reportIfEmptyFunction,
        ArrowFunctionExpression: reportIfEmptyFunction
    }
}
