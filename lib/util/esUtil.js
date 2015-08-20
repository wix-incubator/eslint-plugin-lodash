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

function isChainable(node) {
    return _.includes(aliasMap.CHAINABLE_ALIASES, getMethodName(node));
}

function getCaller(node) {
    return _.get(node, 'callee.object');
}

function isLodashWrapper(node) {
    if (isLodashChainStart(node)) {
        return true;
    }
    return node && node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && isChainable(node) && isLodashWrapper(node.callee.object);
}

module.exports = {
    isLodashCall: isLodashCall,
    getMethodName: getMethodName,
    isLodashChainStart: isLodashChainStart,
    isChainable: isChainable,
    isLodashWrapper: isLodashWrapper,
    getCaller: getCaller
};
