/**
 * @fileoverview Rule to check if a call to map and flatten should be a call to _.flatMap
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const astUtil = require('../util/astUtil')
    const settings = require('../util/settingsUtil').getSettings(context)

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, node => {
            if (lodashUtil.isCallToMethod(node, settings.version, 'flatten') &&
                (lodashUtil.isCallToMethod(astUtil.getCaller(node), settings.version, 'map') || lodashUtil.isLodashCallToMethod(node.arguments[0], settings, 'map'))) {
                context.report(node, 'Prefer _.flatMap over consecutive map and flatten.')
            }
        })
    }
}