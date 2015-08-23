/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    function isCalledByChainStart(node) {
        return lodashUtil.isLodashChainStart(astUtil.getCaller(node));
    }

    function isChainBreakerAfterSingleMethod(node) {
        return lodashUtil.isChainBreaker(node) && isCalledByChainStart(astUtil.getCaller(node));
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isEndOfChain(node) && (isCalledByChainStart(node) || isChainBreakerAfterSingleMethod(node))) {
                context.report(node.callee.property, 'Do not use chain syntax for single method');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
