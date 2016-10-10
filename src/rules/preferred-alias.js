/**
 * @fileoverview Rule to ensure consistency of aliases of lodash methods
 */
'use strict'

/**
 * @fileoverview Rule to ensure consistency of aliases of lodash methods
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {},

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {getMethodName} = require('../util/astUtil')
        const {version} = require('../util/settingsUtil').getSettings(context)
        const aliases = require('../util/methodDataUtil').getAliasesByVersion(version)

        return getLodashMethodVisitors(context, node => {
            const methodName = getMethodName(node)
            if (aliases[methodName]) {
                context.report({
                    node: node.callee.property,
                    message: "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'",
                    data: {
                        old: methodName,
                        new: aliases[methodName]
                    }
                })
            }
        })
    }
}

