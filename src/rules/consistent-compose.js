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
        const {getLodashMethodVisitor} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const {getMethodName} = require('../util/astUtil')
        const {getMainAlias} = require('../util/methodDataUtil')
        
        const direction = context.options[0] || 'flow'
        const mainDirectionMethod = getMainAlias(settings.version, direction)

        function isOtherDirection(methodName) {
            if (includes(possibleDirections, methodName)) {
                const methodDirection = getMainAlias(settings.version, methodName)
                return methodDirection !== mainDirectionMethod
            }
        }

        return {
            CallExpression: getLodashMethodVisitor(settings, node => {
                if (isOtherDirection(getMethodName(node))) {
                    context.report(node, `Use _.${direction} for composition`)
                }
            })
        }
    }
}