/**
 * @fileoverview Rule to ensure consistency of aliases of lodash methods
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const getDocsUrl = require('../util/getDocsUrl')

module.exports = {
    meta: {
        docs: {
            url: getDocsUrl('preferred-alias.md')
        }
    },

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isMainAlias, getMainAlias} = require('../util/methodDataUtil')
        const has = require('lodash/has')

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (!isMainAlias(version, method)) {
                const mainAlias = getMainAlias(version, method)
                if (mainAlias) {
                    context.report({
                        node,
                        message: `Method '${method}' is an alias, for consistency prefer using '${mainAlias}'`
                    })
                }
            }
        })
    }
}
