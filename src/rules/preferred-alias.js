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
        const _ = require('lodash')
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {getMethodName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const aliases = require('../util/methodDataUtil').getAliasesByVersion(settings.version)

        const expandedAliases = _.reduce(aliases, (result, aliasesForKey, key) => {
            const mapToMainKey = _(aliasesForKey)
                .map(alias => [alias, key])
                .fromPairs()
                .value()
            return _.assign(result, mapToMainKey)
        }, {})

        return getLodashMethodVisitors(context, node => {
            const methodName = getMethodName(node)
            if (_.has(expandedAliases, methodName)) {
                context.report({
                    node: node.callee.property,
                    message: "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'",
                    data: {
                        old: methodName,
                        new: expandedAliases[methodName]
                    }
                })
            }
        })
    }
}

