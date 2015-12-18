/**
 * @fileoverview Rule to check if a call to _.indexOf === 0 should be a call to _.startsWith
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');

    function isExpectingZeroIndex(operator) {
        if (operator && operator.type === 'BinaryExpression' && operator.right) {
            return operator.right.value === 0;
        }

        return false;
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isCallToMethod(node, 'indexOf') && isExpectingZeroIndex(node.parent)) {
                context.report(node, 'Prefer _.startsWith instead of _.indexOf(...,) === 0');
            }
        }
    };
};
