/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var DEFAULT_LENGTH = 3;
    var ruleDepth = Math.max(parseInt(context.options[0], 10) || DEFAULT_LENGTH, 2);

    function isNestedNLevels(node, n) {
        return n === 0 || lodashUtil.isLodashCall(node) && isNestedNLevels(node.arguments[0], n - 1);
    }

    return {
        CallExpression: function (node) {
            if (isNestedNLevels(node, ruleDepth)) {
                context.report(astUtil.getCaller(node.arguments[0]), 'Prefer chaining to composition');
            }
        }
    };
};
