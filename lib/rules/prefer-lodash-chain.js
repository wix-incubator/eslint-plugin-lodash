/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    var REPORT_MESSAGE = 'Prefer lodash chain';

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, settings.pragma)) {
                do {
                    node = node.parent.parent;
                } while (astUtil.isMethodCall(node) && !lodashUtil.isChainBreaker(node, settings.version));
                if (lodashUtil.isChainBreaker(node, settings.version) && astUtil.isObjectOfMethodCall(node)) {
                    var callAfterChainBreak = node.parent.parent;
                    if (lodashUtil.isNativeCollectionMethodCall(callAfterChainBreak) || lodashUtil.isLodashWrapperMethod(callAfterChainBreak, settings.version)) {
                        context.report(callAfterChainBreak, REPORT_MESSAGE);
                    }
                }
            } else if (lodashUtil.isLodashCall(node, settings.pragma)) {
                if (astUtil.isMethodCall(node.parent.parent) && (lodashUtil.isNativeCollectionMethodCall(node.parent.parent))) {
                    context.report(node.parent.parent, REPORT_MESSAGE);
                }
            }
        }
    };
};
