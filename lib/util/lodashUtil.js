'use strict';
var _ = require('lodash');
var aliasMap = require('./aliases');
var astUtil = require('./astUtil');

function isLodashCall(node) {
    return astUtil.isCallFromObject(node, '_');
}

function isChainable(node) {
    return _.includes(aliasMap.CHAINABLE_ALIASES, astUtil.getMethodName(node));
}

function isLodashChainStart(node) {
    return node && node.type === 'CallExpression' && (node.callee.name === '_' || (_.get(node, 'callee.object.name') === '_' && astUtil.getMethodName(node) === 'chain'));
}


function isChainBreaker(node) {
    return aliasMap.isAliasOfMethod('value', astUtil.getMethodName(node));
}

function isExplicitMethodChaining(node) {
    var methodName = astUtil.getMethodName(node);
    if (methodName === 'chain') {
        return true;
    }
    return astUtil.isMethodCall(node) && !isChainBreaker(node) && isExplicitMethodChaining(node.callee.object);
}

function isLodashWrapper(node) {
    if (isLodashChainStart(node)) {
        return true;
    }
    return astUtil.isMethodCall(node) && isChainable(node) && isLodashWrapper(node.callee.object);
}

function getLodashIteratee(node) {
    if (isLodashCall(node)) {
        return node.arguments && node.arguments[1];
    }
    return isLodashWrapper(astUtil.getCaller(node)) && node.arguments && node.arguments[0];
}


function isEndOfChain(node) {
    return isLodashWrapper(astUtil.getCaller(node)) && !astUtil.isObjectOfMethodCall(node);
}

function isCallToMethod(node, method) {
    return aliasMap.isAliasOfMethod(method, astUtil.getMethodName(node));
}

function isLodashWrapperMethod(node) {
    return _.includes(aliasMap.WRAPPER_METHODS, astUtil.getMethodName(node)) && node.type === 'CallExpression';
}

module.exports = {
    isLodashCall: isLodashCall,
    isLodashChainStart: isLodashChainStart,
    isChainable: isChainable,
    isLodashWrapper: isLodashWrapper,
    getLodashIteratee: getLodashIteratee,
    isEndOfChain: isEndOfChain,
    isChainBreaker: isChainBreaker,
    isExplicitMethodChaining: isExplicitMethodChaining,
    isCallToMethod: isCallToMethod,
    isLodashWrapperMethod: isLodashWrapperMethod
};
