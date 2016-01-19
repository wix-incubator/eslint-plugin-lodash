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

function isImplicitChainStart(node) {
    return node.callee.name === '_';
}

function isExplicitChainStart(node) {
    return isLodashCall(node) && astUtil.getMethodName(node) === 'chain';
}

function isLodashChainStart(node) {
    return node && node.type === 'CallExpression' && (isImplicitChainStart(node) || isExplicitChainStart(node));
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
    var currentNode = node;
    while (astUtil.isMethodCall(currentNode)) {
        if (isLodashChainStart(currentNode)) {
            return true;
        }
        if (!isChainable(currentNode)) {
            return false;
        }
        currentNode = astUtil.getCaller(currentNode);
    }
    return isLodashChainStart(currentNode);
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
function getIsTypeMethod(name) {
    var types = ['number', 'boolean', 'function', 'Function', 'string', 'object', 'undefined', 'Date', 'Array', 'Error', 'Element'];
    return _.includes(types, name) ? 'is' + _.capitalize(name) : null;
}

function isNativeCollectionMethodCall(node) {
    return _.includes(['every', 'fill', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'map', 'reduce', 'reduceRight', 'some'], astUtil.getMethodName(node));
}

function isLodashCollectionMethod(node) {
    if (!isLodashWrapper(node) && !isLodashCall(node)) {
        return false;
    }
    return _.includes(aliasMap.collectionMethods, astUtil.getMethodName(node));
}

function getLodashMethodVisitor(reporter) {
    return function (node) {
        if (isLodashChainStart(node)) {
            node = node.parent.parent;
            while (astUtil.isMethodCall(node) && !isChainBreaker(node)) {
                reporter(node, node.arguments[0]);
                node = node.parent.parent;
            }
        } else if (isLodashCall(node)) {
            reporter(node, node.arguments[1]);
        }
    };
}

module.exports = {
    isLodashCall: isLodashCall,
    isLodashChainStart: isLodashChainStart,
    isChainable: isChainable,
    isLodashWrapper: isLodashWrapper,
    isEndOfChain: isEndOfChain,
    isChainBreaker: isChainBreaker,
    isExplicitMethodChaining: isExplicitMethodChaining,
    isCallToMethod: isCallToMethod,
    isLodashWrapperMethod: isLodashWrapperMethod,
    getIsTypeMethod: getIsTypeMethod,
    isLodashCollectionMethod: isLodashCollectionMethod,
    isNativeCollectionMethodCall: isNativeCollectionMethodCall,
    isImplicitChainStart: isImplicitChainStart,
    isExplicitChainStart: isExplicitChainStart,
    getLodashMethodVisitor: getLodashMethodVisitor
};
