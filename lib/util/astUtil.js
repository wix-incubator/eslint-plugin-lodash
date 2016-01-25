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
        node.computed === false ||
        (node.computed === true && node.property.type === 'Literal');
}

function isMemberExpOf(node, objectName, maxPropertyPathLength, allowComputed) {
    if (objectName) {
        var curr = node;
        var depth = maxPropertyPathLength;
        while (curr && depth) {
            if (curr.type === 'MemberExpression' && curr.object.name === objectName) {
                return allowComputed || isPropAccess(node);
            }
            curr = curr.object;
            depth--;
        }
    }
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

function isBinaryExpWithMemberOf(operator, exp, objectName, maxPropertyPathLength, allowComputed) {
    return exp && exp.type === 'BinaryExpression' && exp.operator === operator &&
          (isMemberExpOf(exp.left, objectName, maxPropertyPathLength, allowComputed) ||
          isMemberExpOf(exp.right, objectName, maxPropertyPathLength, allowComputed));
}


function isNegationExpression(exp) {
    return exp && exp.type === 'UnaryExpression' && exp.operator === '!';
}

function isNegationOfMemberOf(exp, objectName, maxPropertyPathLength) {
    return isNegationExpression(exp) && isMemberExpOf(exp.argument, objectName, maxPropertyPathLength, false);
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

function isComputed(node) {
    return _.get(node, 'computed') && node.property.type !== 'Literal';
}

function isEquivalentExp(a, b) {
    return _.isEqualWith(a, b, function (left, right, key) {
        if (_.includes(['loc', 'range', 'computed'], key)) {
            return true;
        }
        if (isComputed(left) || isComputed(right)) {
            return false;
        }
        if (key === 'property') {
            var leftValue = left.name || left.value;
            var rightValue = right.name || right.value;
            return leftValue === rightValue;
        }
    });
}

function isEqEqEq(node) {
    return node.type === 'BinaryExpression' && node.operator === '===';
}

module.exports = {
    getCaller: getCaller,
    getMethodName: getMethodName,
    isMethodCall: isMethodCall,
    getFirstFunctionLine: getFirstFunctionLine,
    isMemberExpOf: isMemberExpOf,
    getFirstParamName: getFirstParamName,
    hasOnlyOneStatement: hasOnlyOneStatement,
    isObjectOfMethodCall: isObjectOfMethodCall,
    isEqEqEqToMemberOf: isBinaryExpWithMemberOf.bind(null, '==='),
    isNotEqEqToMemberOf: isBinaryExpWithMemberOf.bind(null, '!=='),
    isNegationOfParamMember: isNegationOfMemberOf,
    isIdentifierOfParam: isIdentifierOfParam,
    isNegationExpression: isNegationExpression,
    getValueReturnedInFirstLine: getValueReturnedInFirstLine,
    isCallFromObject: isCallFromObject,
    isComputed: isComputed,
    isEquivalentExp: isEquivalentExp,
    isEqEqEq: isEqEqEq
};
