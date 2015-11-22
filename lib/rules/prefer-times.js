/**
 * @fileoverview Rule to check if a call to _.map should be a call to _.times
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var _ = require('lodash');
    var callStack = [];

    function getParamName(paramNode) {
        return paramNode.name || paramNode.left.name;
    }

    function handleFunctionExpression(node) {
        if (lodashUtil.isCallToMethod(node.parent, 'map') && (lodashUtil.isLodashCall(node.parent) || lodashUtil.isLodashWrapper(node.parent))) {
            callStack.push({func: node, params: _.map(node.params, getParamName), anyUsed: false});
        }
    }
    function handleExitFunctionExpression(node) {
        var state = _.last(callStack);
        if (state && state.func === node) {
            callStack.pop();
            if (!state.anyUsed) {
                context.report(node.parent, 'Prefer _.times over _.map without using arguments');
            }
        }
    }

    return {
        FunctionExpression: handleFunctionExpression,
        ArrowFunctionExpression: handleFunctionExpression,
        Identifier: function (node) {
            var state = _.last(callStack);
            if (state) {
                var isIterateeParamDefinition = (node.parent === state.func && _.includes(node.parent.params, node)) ||
                    (node.parent.type === 'AssignmentPattern' && node.parent.parent === state.func);
                if (!isIterateeParamDefinition && _.includes(state.params, node.name)) {
                    state.anyUsed = true;
                }
            }
        },
        'FunctionExpression:exit': handleExitFunctionExpression,
        'ArrowFunctionExpression:exit': handleExitFunctionExpression
    };
};
