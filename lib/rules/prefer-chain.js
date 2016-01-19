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
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);

    var ruleDepth = parseInt(context.options[0], 10) || DEFAULT_LENGTH;

    function isNestedNLevels(node, n) {
        return n === 0 || lodashUtil.isLodashCall(node, lodashPragma) && isNestedNLevels(node.arguments[0], n - 1);
    }

    return {
        CallExpression: function (node) {
            if (isNestedNLevels(node, ruleDepth)) {
                context.report(astUtil.getCaller(node.arguments[0]), 'Prefer chaining to composition');
            }
        }
    };
};

module.exports.schema = [
    {
        type: 'integer',
        minimum: 2
    }
];