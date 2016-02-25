'use strict';
var _ = require('lodash');

/**
 * Gets the object that called the method in a CallExpression
 * @param {Object} node
 * @returns {Object|undefined}
 */
function getCaller(node) {
    return _.get(node, 'callee.object');
}

/**
 * Gets the name of a method in a CallExpression
 * @param {Object} node
 * @returns {string|undefined}
 */
function getMethodName(node) {
    return _.get(node, 'callee.property.name');
}

/**
 * Returns whether the node is a method call
 * @param {Object} node
 * @returns {boolean|undefined}
 */
function isMethodCall(node) {
    return node && node.type === 'CallExpression' && node.callee.type === 'MemberExpression';
}

/**
 * Returns whether the node is a function declaration that has a block
 * @param {Object} node
 * @returns {boolean}
 */
function isFunctionDefinitionWithBlock(node) {
    return (node.type === 'FunctionExpression' || (node.type === 'ArrowFunctionExpression' && node.body.type === 'BlockStatement'));
}

/**
 * If the node specified is a function, returns the node corresponding with the first statement/expression in that function
 * @param {Object} node
 * @returns {node|null}
 */
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

/**
 *
 * @param {Object} node
 * @returns {boolean|undefined}
 */
function isPropAccess(node) {
    return node &&
        node.computed === false ||
        (node.computed === true && node.property.type === 'Literal');
}

/**
 * Returns whether the node is a member expression starting with the same object, up to the specified length
 * @param {Object} node
 * @param {string} objectName
 * @param {number} maxPropertyPathLength
 * @param {boolean} allowComputed
 * @returns {boolean|undefined}
 */
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

/**
 * Returns the name of the first parameter of a function, if it exists
 * @param {Object} func
 * @returns {string|undefined}
 */
function getFirstParamName(func) {
    return _.get(func, 'params[0].name');
}

/**
 * Returns whether or not the expression is a return statement
 * @param {Object} exp
 * @returns {boolean|undefined}
 */
function isReturnStatement(exp) {
    return exp && exp.type === 'ReturnStatement';
}

/**
 * Returns whether the node specified has only one statement
 * @param {Object} func
 * @returns {boolean}
 */
function hasOnlyOneStatement(func) {
    return func.type === 'ArrowFunctionExpression' ? !_.get(func, 'body.body') : _.get(func, 'body.body.length') === 1;
}

/**
 * Returns whether the node is an object of a method call
 * @param {Object} node
 * @returns {boolean}
 */
function isObjectOfMethodCall(node) {
    return _.get(node, 'parent.object') === node && _.get(node, 'parent.parent.type') === 'CallExpression';
}

/**
 * Returns whether the expression specified is a binary expression with the specified operator and one of its sides is a member expression of the specified object name
 * @param {string} operator
 * @param {Object} exp
 * @param {string} objectName
 * @param {number} maxPropertyPathLength
 * @param {boolean} allowComputed
 * @returns {boolean|undefined}
 */
function isBinaryExpWithMemberOf(operator, exp, objectName, maxPropertyPathLength, allowComputed) {
    return exp && exp.type === 'BinaryExpression' && exp.operator === operator &&
          (isMemberExpOf(exp.left, objectName, maxPropertyPathLength, allowComputed) ||
          isMemberExpOf(exp.right, objectName, maxPropertyPathLength, allowComputed));
}


/**
 * Returns whether the specified expression is a negation.
 * @param {Object} exp
 * @returns {boolean|undefined}
 */
function isNegationExpression(exp) {
    return exp && exp.type === 'UnaryExpression' && exp.operator === '!';
}

/**
 * Returns whether the expression is a negation of a member of objectName, in the specified depth.
 * @param {Object} exp
 * @param {string} objectName
 * @param {number} maxPropertyPathLength
 * @returns {boolean|undefined}
 */
function isNegationOfMemberOf(exp, objectName, maxPropertyPathLength) {
    return isNegationExpression(exp) && isMemberExpOf(exp.argument, objectName, maxPropertyPathLength, false);
}

/**
 *
 * @param {Object} exp
 * @param {string} paramName
 * @returns {boolean|undefined}
 */
function isIdentifierOfParam(exp, paramName) {
    return exp && paramName && exp.type === 'Identifier' && exp.name === paramName;
}

/**
 * Returns the node of the value returned in the first line, if any
 * @param {Object} func
 * @returns {Object|null}
 */
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

/**
 * Returns whether the node is a call from the specified object name
 * @param {Object} node
 * @param {string} objName
 * @returns {boolean|undefined}
 */
function isCallFromObject(node, objName) {
    return node && node.type === 'CallExpression' && _.get(node, 'callee.object.name') === objName;
}

/**
 * Returns whether the node is actually computed (x['ab'] does not count, x['a' + 'b'] does
 * @param {Object} node
 * @returns {boolean|undefined}
 */
function isComputed(node) {
    return _.get(node, 'computed') && node.property.type !== 'Literal';
}

/**
 * Returns whether the two expressions refer to the same object (e.g. a['b'].c and a.b.c)
 * @param {Object} a
 * @param {Object} b
 * @returns {boolean}
 */
function isEquivalentExp(a, b) {
    return _.isEqualWith(a, b, function (left, right, key) {
        if (_.includes(['loc', 'range', 'computed', 'start', 'end'], key)) {
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

/**
 * Returns whether the expression is a strict equality comparison, ===
 * @param {Object} node
 * @returns {boolean}
 */
function isEqEqEq(node) {
    return node && node.type === 'BinaryExpression' && node.operator === '===';
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
