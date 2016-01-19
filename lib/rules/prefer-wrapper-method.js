/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);


    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, lodashPragma) && lodashUtil.isLodashWrapperMethod(node.arguments[0])) {
                context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name});
            }
        }
    };
};
