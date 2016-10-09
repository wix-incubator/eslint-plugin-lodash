/**
 * @fileoverview Rule to check if a call to map and flatten should be a call to _.flatMap
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to map and flatten should be a call to _.flatMap
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getLodashMethodVisitor, isCallToMethod, isLodashCallToMethod} = require('../util/lodashUtil')
        const {getCaller} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)

        return {
            CallExpression: getLodashMethodVisitor(settings, node => {
                if (isCallToMethod(node, settings.version, 'flatten') &&
                    (isCallToMethod(getCaller(node), settings.version, 'map') || isLodashCallToMethod(node.arguments[0], settings, 'map'))) {
                    context.report(node, 'Prefer _.flatMap over consecutive map and flatten.')
                }
            })
        }
    }
}