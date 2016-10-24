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
        const {version} = require('../util/settingsUtil').getSettings(context)
        const aliases = require('../util/methodDataUtil').getAliasesByVersion(version)
        const has = require('lodash/has')

        return getLodashMethodVisitors(context, (node, iteratee, {method}) => {
            if (has(aliases, method)) {
                context.report({
                    node,
                    message: `Method '${method}' is an alias, for consistency prefer using '${aliases[method]}'`
                })
            }
        })
    }
}

