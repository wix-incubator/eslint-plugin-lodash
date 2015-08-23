/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');

    function isBound(node) {
        return node && node.type === 'CallExpression' && esUtil.getMethodName(node) === 'bind';
    }

    return {
        CallExpression: function (node) {
            try {
                if (isBound(esUtil.getLodashIteratee(node))) {
                    context.report(node.callee.property, 'Unnecessary bind, pass `thisArg` to lodash method instead');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
