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
                (lodashUtil.isChainable(node) || (lodashUtil.isExplicitMethodChaining(node) && !lodashUtil.isChainBreaker(node)))) {
                context.report(node, 'Missing unwrapping at end of chain');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
