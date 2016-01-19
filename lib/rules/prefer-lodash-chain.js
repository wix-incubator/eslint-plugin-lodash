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
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);


    var REPORT_MESSAGE = 'Prefer lodash chain';

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node, lodashPragma)) {
                do {
                    node = node.parent.parent;
                } while (astUtil.isMethodCall(node) && !lodashUtil.isChainBreaker(node));
                if (lodashUtil.isChainBreaker(node) && astUtil.isObjectOfMethodCall(node)) {
                    var callAfterChainBreak = node.parent.parent;
                    if (lodashUtil.isNativeCollectionMethodCall(callAfterChainBreak) || lodashUtil.isLodashWrapperMethod(callAfterChainBreak)) {
                        context.report(callAfterChainBreak, REPORT_MESSAGE);
                    }
                }
            } else if (lodashUtil.isLodashCall(node, lodashPragma)) {
                if (astUtil.isMethodCall(node.parent.parent) && (lodashUtil.isNativeCollectionMethodCall(node.parent.parent))) {
                    context.report(node.parent.parent, REPORT_MESSAGE);
                }
            }
        }
    };
};
