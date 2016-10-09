/**
 * @fileoverview Rule to make sure lodash method calls don't use superfluous arguments
 */
'use strict'

/**
 * @fileoverview Rule to make sure lodash method calls don't use superfluous arguments
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const settings = require('../util/settingsUtil').getSettings(context)
        const {isLodashCall, getLodashMethodVisitor} = require('../util/lodashUtil')
        const {getMethodName} = require('../util/astUtil')
        const {getFunctionMaxArity} = require('../util/methodDataUtil')

        function getExpectedArity(node) {
            const maxArity = getFunctionMaxArity(settings.version, getMethodName(node))
            return Math.max(isLodashCall(node, settings.pragma) ? maxArity : maxArity - 1, 0)
        }

        return {
            CallExpression: getLodashMethodVisitor(settings, node => {
                const expectedArity = getExpectedArity(node)
                if (node.arguments.length > expectedArity) {
                    context.report({
                        node,
                        message: 'Too many arguments passed to `{{method}}` (expected {{expectedArity}}).',
                        data: {method: getMethodName(node), expectedArity}
                    })
                }
            })
        }
    }
}
