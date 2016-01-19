'use strict';
var _ = require('lodash');
var aliasMap = require('./aliases');
var astUtil = require('./astUtil');

function isLodashCall(node, lodashPragma) {
    return astUtil.isCallFromObject(node, lodashPragma);
}

function isChainable(node) {
    return _.includes(aliasMap.CHAINABLE_ALIASES, astUtil.getMethodName(node));
}

function isImplicitChainStart(node, lodashPragma) {
    return node.callee.name === lodashPragma;
}

function isExplicitChainStart(node, lodashPragma) {
    return isLodashCall(node, lodashPragma) && astUtil.getMethodName(node) === 'chain';
}

function isLodashChainStart(node, lodashPragma) {
    return node && node.type === 'CallExpression' && (isImplicitChainStart(node, lodashPragma) || isExplicitChainStart(node, lodashPragma));
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

function isLodashWrapper(node, lodashPragma) {
    var currentNode = node;
    while (astUtil.isMethodCall(currentNode)) {
        if (isLodashChainStart(currentNode, lodashPragma)) {
            return true;
        }
        if (!isChainable(currentNode)) {
            return false;
        }
        currentNode = astUtil.getCaller(currentNode);
    }
    return isLodashChainStart(currentNode, lodashPragma);
}

function isEndOfChain(node, lodashPragma) {
    return isLodashWrapper(astUtil.getCaller(node), lodashPragma) && !astUtil.isObjectOfMethodCall(node);
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

function isLodashCollectionMethod(node, lodashPragma) {
    if (!isLodashWrapper(node, lodashPragma) && !isLodashCall(node, lodashPragma)) {
        return false;
    }
    return _.includes(aliasMap.collectionMethods, astUtil.getMethodName(node));
}

function getLodashMethodVisitor(lodashPragma, reporter) {
    return function (node) {
        if (isLodashChainStart(node, lodashPragma)) {
            node = node.parent.parent;
            while (astUtil.isMethodCall(node) && !isChainBreaker(node)) {
                reporter(node, node.arguments[0]);
                node = node.parent.parent;
            }
        } else if (isLodashCall(node, lodashPragma)) {
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
