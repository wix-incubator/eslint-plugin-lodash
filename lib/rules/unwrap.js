/**
 * @fileoverview Rule to ensure a lodash chain ends
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    function isExplicitChainWithoutBreaker(node) {
        return lodashUtil.isExplicitMethodChaining(node, settings.version) && !lodashUtil.isChainBreaker(node, settings.version);
    }
    function isEvaluatedWhenLazy(node) {
        return lodashUtil.isCallToMethod(node, settings.version, 'commit') || !lodashUtil.isChainable(node, settings.version);
    }
    return {
        CallExpression: function (node) {
            if (lodashUtil.isEndOfChain(node, settings.pragma, settings.version) && (!isEvaluatedWhenLazy(node) || isExplicitChainWithoutBreaker(node))) {
                context.report(node, 'Missing unwrapping at end of chain');
            }
        }
    };
};
