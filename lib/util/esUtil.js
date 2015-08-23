'use strict';
var _ = require('lodash');
var aliasMap = require('./aliases');


function getCaller(node) {
    return _.get(node, 'callee.object');
}

function isLodashCall(node) {
    return node && node.type === 'CallExpression' && _.get(getCaller(node), 'name') === '_';
}

function getMethodName(node) {
    return _.get(node, 'callee.property.name');
}

function isChainable(node) {
    return _.includes(aliasMap.CHAINABLE_ALIASES, getMethodName(node));
}

function isLodashChainStart(node) {
    return node && node.type === 'CallExpression' && (node.callee.name === '_' || (node.callee.object.name === '_' && getMethodName(node) === 'chain'));
}


function isChainBreaker(node) {
    return aliasMap.isAliasOfMethod('value', getMethodName(node));
}

function isMethodCall(node) {
    return node && node.type === 'CallExpression' && node.callee.type === 'MemberExpression';
}

function isExplicitMethodChaining(node) {
    var methodName = getMethodName(node);
    if (methodName === 'chain') {
        return true;
    }
    return isMethodCall(node) && !isChainBreaker(node) && isExplicitMethodChaining(node.callee.object);
}


function isLodashWrapper(node) {
    if (isLodashChainStart(node)) {
        return true;
    }
    return isMethodCall(node) && isChainable(node) && isLodashWrapper(node.callee.object);
}

function getLodashIteratee(node) {
    if (isLodashCall(node)) {
        return node.arguments && node.arguments[1];
    }
    return isLodashWrapper(getCaller(node)) && node.arguments && node.arguments[0];
}

function getFirstFunctionLine(node) {
    return node && node.type === 'FunctionExpression' && _.get(node, 'body.body[0]');
}

function isPropAccess(node) {
    return node &&
        (node.computed === false) ||
        (node.computed === true && node.property.type === 'Literal' && _.isString(node.property.value));
}

function isMemberExpOfArg(node, argName) {
    return node.type === 'MemberExpression' && node.object && node.object.name === argName && isPropAccess(node);
}

function getFirstParamName(func) {
    return _.get(func, 'params[0].name');
}

function isReturnStatement(exp) {
    return exp && exp.type === 'ReturnStatement';
}

function hasOnlyOneStatement(func) {
    return _.get(func, 'body.body.length') === 1;
}

function isObjectOfMethodCall(node) {
    return _.get(node, 'parent.object') === node && _.get(node, 'parent.parent.type') === 'CallExpression';
}

function isEndOfChain(node) {
    return isLodashWrapper(getCaller(node)) && !isObjectOfMethodCall(node);
}


module.exports = {
    isLodashCall: isLodashCall,
    getMethodName: getMethodName,
    isLodashChainStart: isLodashChainStart,
    isChainable: isChainable,
    isLodashWrapper: isLodashWrapper,
    getCaller: getCaller,
    isMemberExpOfArg: isMemberExpOfArg,
    getLodashIteratee: getLodashIteratee,
    getFirstFunctionLine: getFirstFunctionLine,
    getFirstParamName: getFirstParamName,
    isReturnStatement: isReturnStatement,
    hasOnlyOneStatement: hasOnlyOneStatement,
    isEndOfChain: isEndOfChain,
    isChainBreaker: isChainBreaker,
    isExplicitMethodChaining: isExplicitMethodChaining
};
