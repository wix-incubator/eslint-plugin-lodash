/**
 * @fileoverview Rule to make sure lodash method calls don't use superfluous arguments
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const settings = require('../util/settingsUtil').getSettings(context)
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const methodDataUtil = require('../util/methodDataUtil')

    function getExpectedArity(node) {
        const maxArity = methodDataUtil.getFunctionMaxArity(settings.version, astUtil.getMethodName(node))
        return Math.max(lodashUtil.isLodashCall(node, settings.pragma) ? maxArity : maxArity - 1, 0)
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, node => {
            const expectedArity = getExpectedArity(node)
            if (node.arguments.length > expectedArity) {
                context.report({
                    node,
                    message: 'Too many arguments passed to `{{method}}` (expected {{expectedArity}}).',
                    data: {method: astUtil.getMethodName(node), expectedArity}
                })
            }
        })
    }
}
