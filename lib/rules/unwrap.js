/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');

    return {
        CallExpression: function (node) {
            if (esUtil.isEndOfChain(node) && (esUtil.isChainable(node) || (esUtil.isExplicitMethodChaining(node) && !esUtil.isChainBreaker(node)))) {
                context.report(node, 'Missing unwrapping at end of chain');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
