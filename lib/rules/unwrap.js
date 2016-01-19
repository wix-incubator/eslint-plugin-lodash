/**
 * @fileoverview Rule to ensure a lodash chain ends
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);

    function isExplicitChainWithoutBreaker(node) {
        return lodashUtil.isExplicitMethodChaining(node, lodashPragma) && !lodashUtil.isChainBreaker(node);
    }
    function isEvaluatedWhenLazy(node) {
        return lodashUtil.isCallToMethod(node, 'commit') || !lodashUtil.isChainable(node);
    }
    return {
        CallExpression: function (node) {
            if (lodashUtil.isEndOfChain(node, lodashPragma) && (!isEvaluatedWhenLazy(node) || isExplicitChainWithoutBreaker(node))) {
                context.report(node, 'Missing unwrapping at end of chain');
            }
        }
    };
};
