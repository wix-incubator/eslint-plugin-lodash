/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');
    var DEFAULT_LENGTH = 3;
    var ruleDepth = Math.max(parseInt(context.options[0], 10) || DEFAULT_LENGTH, 2);

    function isNestedNLevels(node, n) {
        return n === 0 || esUtil.isLodashCall(node) && isNestedNLevels(node.arguments[0], n - 1);
    }
    return {
        CallExpression: function (node) {
            try {
                if (isNestedNLevels(node, ruleDepth)) {
                    context.report(esUtil.getCaller(node.arguments[0]), 'Prefer chaining to composition');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e + ' ' + e.stack);
            }
        }
    };
};
