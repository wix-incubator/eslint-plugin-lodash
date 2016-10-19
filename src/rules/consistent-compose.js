/**
 * @fileoverview Rule to enforce a consistent composition method
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const possibleDirections = ['pipe', 'compose', 'flow', 'flowRight']

module.exports = {
    meta: {
        schema: [{
            enum: possibleDirections
        }]
    },

    create(context) {
        const includes = require('lodash/includes')
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {getMainAlias} = require('../util/methodDataUtil')

        const direction = context.options[0] || 'flow'
        let mainDirectionMethod

        function isOtherDirection(method, version) {
            if (includes(possibleDirections, method)) {
                const methodDirection = getMainAlias(version, method)
                return methodDirection !== mainDirectionMethod
            }
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            mainDirectionMethod = mainDirectionMethod || getMainAlias(version, direction)
            if (isOtherDirection(method, version)) {
                context.report(node, `Use _.${direction} for composition`)
            }
        })
    }
}