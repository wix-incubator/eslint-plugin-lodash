/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
'use strict'

/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        schema: [{
            type: 'integer',
            minimum: 2
        }]
    },

    create(context) {
        const {isLodashCall} = require('../util/lodashUtil')
        const {getCaller} = require('../util/astUtil')
        const DEFAULT_LENGTH = 3
        const settings = require('../util/settingsUtil').getSettings(context)
        const ruleDepth = parseInt(context.options[0], 10) || DEFAULT_LENGTH

        function isNestedNLevels(node, n) {
            return n === 0 || isLodashCall(node, settings.pragma) && isNestedNLevels(node.arguments[0], n - 1)
        }

        return {
            CallExpression(node) {
                if (isNestedNLevels(node, ruleDepth)) {
                    context.report(getCaller(node.arguments[0]), 'Prefer chaining to composition')
                }
            }
        }
    }
}