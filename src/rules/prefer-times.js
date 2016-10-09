/**
 * @fileoverview Rule to check if a call to map should be a call to times
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to map should be a call to times
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')
        const get = require('lodash/get')
        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'map', method) && get(iteratee, 'params.length') === 0) {
                context.report(node, 'Prefer _.times over _.map without using arguments')
            }
        })
    }
}
