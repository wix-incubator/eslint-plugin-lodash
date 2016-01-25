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
    var settings = require('../util/settingsUtil').getSettings(context);
    function isEndOfChain(node) {
        return !astUtil.isObjectOfMethodCall(node);
    }

    function isBeforeChainBreaker(node) {
        return lodashUtil.isChainBreaker(node.parent.parent, settings.version);
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, settings.pragma)) {
                var firstCall = node.parent.parent;
                if (astUtil.isMethodCall(firstCall) && (isEndOfChain(firstCall) || isBeforeChainBreaker(firstCall))) {
                    context.report(firstCall, 'Do not use chain syntax for single method');
                }
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
