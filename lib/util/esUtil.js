'use strict';
var _ = require('lodash');

function isLodashCall(node) {
    return node && node.type === 'CallExpression' && _.get(node, 'callee.object.name') === '_';
}

function getMethodName(node) {
    return _.get(node, 'callee.property.name');
}

function isLodashChainStart(node) {
    return node.type === 'CallExpression' && node.callee.name === '_';
}

function isLodashWrapper(node) {
    if (isLodashChainStart(node)) {
        return true;
    }
    return node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && /*node.callee.property === 'method in the chaining list' &&*/ isLodashWrapper(node.callee.object);
}

module.exports = {
    isLodashCall: isLodashCall,
    getMethodName: getMethodName,
    isLodashChainStart: isLodashChainStart,
    isLodashWrapper: isLodashWrapper
};
