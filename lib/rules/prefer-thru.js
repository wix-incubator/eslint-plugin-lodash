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

    function isSingleArgumentFunctionCall(node) {
        return node && node.type === 'CallExpression' && node.arguments.length === 1 && node.arguments[0].type !== 'Literal';
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, lodashPragma) && isSingleArgumentFunctionCall(node.arguments[0])) {
                context.report(node, 'Prefer using thru instead of function call in chain start.');
            }
        }
    };
};
