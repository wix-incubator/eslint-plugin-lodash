/**
 * @fileoverview Rule to check if a call to map and flatten should be a call to _.flatMap
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);

    function isCallToLodashMap(node) {
        return lodashUtil.isLodashCall(node, settings.pragma) && lodashUtil.isCallToMethod(node, settings.version, 'map');
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node) {
            if (lodashUtil.isCallToMethod(node, settings.version, 'flatten') &&
                (lodashUtil.isCallToMethod(astUtil.getCaller(node), settings.version, 'map') || isCallToLodashMap(node.arguments[0]))) {
                context.report(node, 'Prefer _.flatMap over consecutive map and flatten.');
            }
        })
    };
};