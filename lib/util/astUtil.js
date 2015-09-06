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

function isFunctionDefinitionWithBlock(node) {
    return (node.type === 'FunctionExpression' || (node.type === 'ArrowFunctionExpression' && node.body.type === 'BlockStatement'));
}

function getFirstFunctionLine(node) {
    if (node) {
        if (isFunctionDefinitionWithBlock(node)) {
            return _.get(node, 'body.body[0]');
        }
        if (node.type === 'ArrowFunctionExpression') {
            return node.body;
        }
    }
    return null;
}

function isPropAccess(node) {
    return node &&
        (node.computed === false) ||
        (node.computed === true && node.property.type === 'Literal' && _.isString(node.property.value));
}

function isMemberExpOfArg(node, argName) {
    return argName && _.get(node, 'type') === 'MemberExpression' && _.get(node, 'object.name') === argName && isPropAccess(node);
}

function getFirstParamName(func) {
    return _.get(func, 'params[0].name');
}

function isReturnStatement(exp) {
    return exp && exp.type === 'ReturnStatement';
}

function hasOnlyOneStatement(func) {
    return func.type === 'ArrowFunctionExpression' ? !_.get(func, 'body.body') : _.get(func, 'body.body.length') === 1;
}

function isObjectOfMethodCall(node) {
    return _.get(node, 'parent.object') === node && _.get(node, 'parent.parent.type') === 'CallExpression';
}

function isAnySideArgMemberExp(exp, paramName) {
    return (isMemberExpOfArg(exp.left, paramName) ||
    isMemberExpOfArg(exp.right, paramName));
}

function isEqEqEqToParamMember(exp, paramName) {
    return exp && exp.type === 'BinaryExpression' && exp.operator === '===' && isAnySideArgMemberExp(exp, paramName);
}
function isNotEqEqToParamMember(exp, paramName) {
    return exp && exp.type === 'BinaryExpression' && exp.operator === '!==' && isAnySideArgMemberExp(exp, paramName);
}

function isNegationExpression(exp) {
    return exp && exp.type === 'UnaryExpression' && exp.operator === '!';
}

function isNegationOfParamMember(exp, firstParamName) {
    return isNegationExpression(exp) && isMemberExpOfArg(exp.argument, firstParamName);
}

function isIdentifierOfParam(exp, paramName) {
    return exp && paramName && exp.type === 'Identifier' && exp.name === paramName;
}

function getValueReturnedInFirstLine(func) {
    var firstLine = getFirstFunctionLine(func);
    if (func) {
        if (isFunctionDefinitionWithBlock(func)) {
            return isReturnStatement(firstLine) ? firstLine.argument : null;
        }
        if (func.type === 'ArrowFunctionExpression') {
            return firstLine;
        }
    }
    return null;
}

function isCallFromObject(node, objName) {
    return node && node.type === 'CallExpression' && _.get(node, 'callee.object.name') === objName;
}

module.exports = {
    getCaller: getCaller,
    getMethodName: getMethodName,
    isMethodCall: isMethodCall,
    getFirstFunctionLine: getFirstFunctionLine,
    isMemberExpOfArg: isMemberExpOfArg,
    getFirstParamName: getFirstParamName,
    hasOnlyOneStatement: hasOnlyOneStatement,
    isObjectOfMethodCall: isObjectOfMethodCall,
    isEqEqEqToParamMember: isEqEqEqToParamMember,
    isNotEqEqToParamMember: isNotEqEqToParamMember,
    isNegationOfParamMember: isNegationOfParamMember,
    isIdentifierOfParam: isIdentifierOfParam,
    isNegationExpression: isNegationExpression,
    getValueReturnedInFirstLine: getValueReturnedInFirstLine,
    isCallFromObject: isCallFromObject
};
