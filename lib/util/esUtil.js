'use strict';
var _ = require('lodash');
var aliasMap = require('../util/aliases');

function isLodashCall(node) {
    return node && node.type === 'CallExpression' && _.get(node, 'callee.object.name') === '_';
}

function getMethodName(node) {
    return _.get(node, 'callee.property.name');
}

function isLodashChainStart(node) {
    return node && node.type === 'CallExpression' && node.callee.name === '_';
}

function isChainable(name) {
    return _.includes(aliasMap.CHAINABLE_ALIASES, name);
}

function isLodashWrapper(node) {
    if (isLodashChainStart(node)) {
        return true;
    }
    return node && node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && isChainable(node.callee.property.name) && isLodashWrapper(node.callee.object);
}

module.exports = {
    isLodashCall: isLodashCall,
    getMethodName: getMethodName,
    isLodashChainStart: isLodashChainStart,
    isLodashWrapper: isLodashWrapper
};
