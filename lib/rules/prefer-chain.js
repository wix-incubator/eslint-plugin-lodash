/**
 * @fileoverview Rule to check if the expression could be better expressed as a chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// TODO add config option for depth
module.exports = function (context) {
    var esUtil = require('../util/esUtil');

    return {
        CallExpression: function (node) {
            try {
                if (esUtil.isLodashCall(node) && node.arguments.length > 0 &&
                    node.arguments[0].type === 'CallExpression' && node.arguments[0].callee.type === 'MemberExpression' && esUtil.isLodashCall(node.arguments[0])) {
                    context.report(node.arguments[0].callee.object, 'Prefer chaining to composition');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};
