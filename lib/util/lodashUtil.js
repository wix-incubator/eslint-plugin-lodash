'use strict';
var _ = require('lodash');
var methodDataUtil = require('./methodDataUtil');
var astUtil = require('./astUtil');

/**
 * Returns whether the node is a lodash call with the specified pragma
 * @param {Object} node
 * @param {string} pragma
 * @returns {boolean}
 */
function isLodashCall(node, pragma) {
    return astUtil.isCallFromObject(node, pragma);
}

/**
 * Returns whether or not a node is a chainable method call in the specified version
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isChainable(node, version) {
    return _.includes(methodDataUtil.getChainableAliases(version), astUtil.getMethodName(node));
}

/**
 * Returns whether the node is an implicit chain start, '_(obj)...'
 * @param {Object} node
 * @param {string} pragma
 * @returns {boolean}
 */
function isImplicitChainStart(node, pragma) {
    return node.callee.name === pragma;
}

/**
 * Returns whether the node is an explicit chain start, '_.chain(obj)...'
 * @param {Object} node
 * @param {string} pragma
 * @returns {boolean}
 */
function isExplicitChainStart(node, pragma) {
    return isLodashCall(node, pragma) && astUtil.getMethodName(node) === 'chain';
}

/**
 * Returns whether the node specified is a chain start, implicit or explicit
 * @param {Object} node
 * @param {string} pragma
 * @returns {undefined|boolean}
 */
function isLodashChainStart(node, pragma) {
    return node && node.type === 'CallExpression' && (isImplicitChainStart(node, pragma) || isExplicitChainStart(node, pragma));
}

/**
 * Returns whehter the node is a chain breaker method in the specified version
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isChainBreaker(node, version) {
    return methodDataUtil.isAliasOfMethod(version, 'value', astUtil.getMethodName(node));
}

/**
 * Returns whether or not the node is part of an explicit chain
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isExplicitMethodChaining(node, version) {
    var methodName = astUtil.getMethodName(node);
    if (methodName === 'chain') {
        return true;
    }
    return astUtil.isMethodCall(node) && !isChainBreaker(node, version) && isExplicitMethodChaining(node.callee.object, version);
}

/**
 * Returns whether the node is in a lodash chain
 * @param {Object} node
 * @param {string} pragma
 * @param {number} version
 * @returns {*}
 */
function isLodashWrapper(node, pragma, version) {
    var currentNode = node;
    while (astUtil.isMethodCall(currentNode)) {
        if (isLodashChainStart(currentNode, pragma)) {
            return true;
        }
        if (!isChainable(currentNode, version)) {
            return false;
        }
        currentNode = astUtil.getCaller(currentNode);
    }
    return isLodashChainStart(currentNode, pragma);
}

/**
 * Returns whether or not the node is the last call of a Lodash chain
 * @param {Object} node
 * @param {string} pragma
 * @param {number} version
 * @returns {boolean}
 */
function isEndOfChain(node, pragma, version) {
    return isLodashWrapper(astUtil.getCaller(node), pragma, version) && !astUtil.isObjectOfMethodCall(node);
}

/**
 * Returns whether the node is a call to the specified method or one of its aliases in the version
 * @param {Object} node
 * @param {number} version
 * @param {string} method
 * @returns {boolean}
 */
function isCallToMethod(node, version, method) {
    return methodDataUtil.isAliasOfMethod(version, method, astUtil.getMethodName(node));
}

/**
 * Returns whether or not the node is a call to a lodash wrapper method
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isLodashWrapperMethod(node, version) {
    return _.includes(methodDataUtil.getWrapperMethods(version), astUtil.getMethodName(node)) && node.type === 'CallExpression';
}

/**
 * Gets the 'isX' method for a specified type, e.g. isObject
 * @param {string} name
 * @returns {string|null}
 */
function getIsTypeMethod(name) {
    var types = ['number', 'boolean', 'function', 'Function', 'string', 'object', 'undefined', 'Date', 'Array', 'Error', 'Element'];
    return _.includes(types, name) ? 'is' + _.capitalize(name) : null;
}

/**
 * Returns whether or not the node is a call to a native collection method
 * @param {Object} node
 * @returns {boolean}
 */
function isNativeCollectionMethodCall(node) {
    return _.includes(['every', 'fill', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'map', 'reduce', 'reduceRight', 'some'], astUtil.getMethodName(node));
}

/**
 * Returns whether or not the node is a call to a lodash collection method in the specified version
 * @param {Object} node
 * @param {string} pragma
 * @param {number} version
 * @returns {boolean}
 */
function isLodashCollectionMethod(node, pragma, version) {
    if (!isLodashWrapper(node, pragma, version) && !isLodashCall(node, pragma)) {
        return false;
    }
    return _.includes(methodDataUtil.getCollectionMethods(version), astUtil.getMethodName(node));
}

/**
 * Gets the context's Lodash settings and a function and returns a visitor that calls the function for every Lodash or chain call
 * @param {LodashSettings} settings
 * @param {LodashReporter} reporter
 * @returns {NodeTypeVisitor}
 */
function getLodashMethodVisitor(settings, reporter) {
    return function (node) {
        var iterateeIndex;
        if (isLodashChainStart(node, settings.pragma)) {
            node = node.parent.parent;
            while (astUtil.isMethodCall(node) && !isChainBreaker(node, settings.version)) {
                iterateeIndex = methodDataUtil.getIterateeIndex(settings.version, astUtil.getMethodName(node));
                reporter(node, node.arguments[iterateeIndex - 1]);
                node = node.parent.parent;
            }
        } else if (isLodashCall(node, settings.pragma)) {
            iterateeIndex = methodDataUtil.getIterateeIndex(settings.version, astUtil.getMethodName(node));
            reporter(node, node.arguments[iterateeIndex]);
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

/**
 @callback LodashReporter
 @param {Object} node
 @param {Object} iteratee
 */

/**
 @callback NodeTypeVisitor
 @param {Object} node
 */