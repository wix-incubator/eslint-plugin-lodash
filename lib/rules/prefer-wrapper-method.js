/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var _ = require('lodash');
    var WRAPPER_METHODS = ['concat', 'join', 'pop', 'push', 'reverse', 'shift', 'slice', 'sort', 'splice', 'unshift', 'replace', 'split'];
    function isCallToWrapperMethod(node) {
        return node && node.type === 'CallExpression' && _.includes(WRAPPER_METHODS, _.get(node, 'callee.property.name'));
    }

    return {
        CallExpression: function (node) {
            if (lodashUtil.isLodashChainStart(node) && isCallToWrapperMethod(node.arguments[0])) {
                context.report(node, 'Prefer {{name}} with wrapper method over inside the chain start.', {name: node.arguments[0].callee.property.name});
            }
        }
    };
};
