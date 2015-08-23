/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');
    var aliases = require('../util/aliases');

    function isEndOfChain(node) {
        return esUtil.isLodashWrapper(esUtil.getCaller(node)) && !esUtil.isChainable(node);
    }

    function isChainBreaker(node) {
        return aliases.isAliasOfMethod('value', esUtil.getMethodName(node));
    }

    function isCalledByChainStart(node) {
        return esUtil.isLodashChainStart(esUtil.getCaller(node));
    }

    function isChainBreakerAfterSingleMethod(node) {
        return isChainBreaker(node) && isCalledByChainStart(esUtil.getCaller(node));
    }

    return {
        CallExpression: function (node) {
            if (isEndOfChain(node) && (isCalledByChainStart(node) || isChainBreakerAfterSingleMethod(node))) {
                context.report(node.callee.property, 'Do not use chain syntax for single method');
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
