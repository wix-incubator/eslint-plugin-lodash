'use strict';
var _ = require('lodash');

function getCaller(node) {
    return _.get(node, 'callee.object');
}

function getMethodName(node) {
    return _.get(node, 'callee.property.name');
}

function isMethodCall(node) {
    return node && node.type === 'CallExpression' && node.callee.type === 'MemberExpression';
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

module.exports = {
    getCaller: getCaller,
    getMethodName: getMethodName,
    isMethodCall: isMethodCall,
    getFirstFunctionLine: getFirstFunctionLine,
    isMemberExpOfArg: isMemberExpOfArg,
    getFirstParamName: getFirstParamName,
    isReturnStatement: isReturnStatement,
    hasOnlyOneStatement: hasOnlyOneStatement,
    isObjectOfMethodCall: isObjectOfMethodCall
};
