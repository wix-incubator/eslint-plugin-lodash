/**
 * @fileoverview Rule to ensure a lodash chain ends
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');

    return {
        CallExpression: function (node) {
            if (lodashUtil.isEndOfChain(node) &&
                ((lodashUtil.isChainable(node) && !lodashUtil.isCallToMethod(node, 'commit')) || (lodashUtil.isExplicitMethodChaining(node) && !lodashUtil.isChainBreaker(node)))) {
                context.report(node, 'Missing unwrapping at end of chain');
            }
        }
    };
};
