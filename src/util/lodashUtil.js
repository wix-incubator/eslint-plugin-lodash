'use strict'
const _ = require('lodash')
const methodDataUtil = require('./methodDataUtil')
const astUtil = require('./astUtil')

/**
 * Returns whether the node is a lodash call with the specified pragma
 * @param {Object} node
 * @param {string} pragma
 * @returns {boolean}
 */
function isLodashCall(node, pragma) {
    return astUtil.isCallFromObject(node, pragma)
}

/**
 * Returns whether or not a node is a chainable method call in the specified version
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isChainable(node, version) {
    return _.includes(methodDataUtil.getChainableAliases(version), astUtil.getMethodName(node))
}

/**
 * Returns whether the node is an implicit chain start, '_(obj)...'
 * @param {Object} node
 * @param {string} pragma
 * @returns {boolean}
 */
function isImplicitChainStart(node, pragma) {
    return node.callee.name === pragma
}

/**
 * Returns whether the node is an explicit chain start, '_.chain(obj)...'
 * @param {Object} node
 * @param {string} pragma
 * @returns {boolean}
 */
function isExplicitChainStart(node, pragma) {
    return isLodashCall(node, pragma) && astUtil.getMethodName(node) === 'chain'
}

/**
 * Returns whether the node specified is a chain start, implicit or explicit
 * @param {Object} node
 * @param {string} pragma
 * @returns {undefined|boolean}
 */
function isLodashChainStart(node, pragma) {
    return node && node.type === 'CallExpression' && (isImplicitChainStart(node, pragma) || isExplicitChainStart(node, pragma))
}

/**
 * Returns whehter the node is a chain breaker method in the specified version
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isChainBreaker(node, version) {
    return methodDataUtil.isAliasOfMethod(version, 'value', astUtil.getMethodName(node))
}

/**
 * Returns whether the node is in a lodash chain
 * @param {Object} node
 * @param {string} pragma
 * @param {number} version
 * @returns {*}
 */
function isLodashWrapper(node, pragma, version) {
    let currentNode = node
    let chainable = true
    while (astUtil.isMethodCall(currentNode)) {
        if (isLodashChainStart(currentNode, pragma)) {
            return true
        }
        if (isChainBreaker(currentNode, version)) {
            return false
        }
        if (!isChainable(currentNode, version)) {
            chainable = false
        }
        currentNode = astUtil.getCaller(currentNode)
    }
    return chainable ? isLodashChainStart(currentNode, pragma) : isExplicitChainStart(currentNode, pragma)
}

/**
 * Returns whether the node is a call to the specified method or one of its aliases in the version
 * @param {Object} node
 * @param {number} version
 * @param {string} method
 * @returns {boolean}
 */
function isCallToMethod(node, version, method) {
    return methodDataUtil.isAliasOfMethod(version, method, astUtil.getMethodName(node))
}

/**
 * Returns whether or not the node is a call to a lodash wrapper method
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isLodashWrapperMethod(node, version) {
    return _.includes(methodDataUtil.getWrapperMethods(version), astUtil.getMethodName(node)) && node.type === 'CallExpression'
}

/**
 * Gets the 'isX' method for a specified type, e.g. isObject
 * @param {string} name
 * @returns {string|null}
 */
function getIsTypeMethod(name) {
    const types = ['number', 'boolean', 'function', 'Function', 'string', 'object', 'undefined', 'Date', 'Array', 'Error', 'Element']
    return _.includes(types, name) ? `is${_.capitalize(name)}` : null
}

/**
 * Returns whether or not the node is a call to a native collection method
 * @param {Object} node
 * @returns {boolean}
 */
function isNativeCollectionMethodCall(node) {
    return _.includes(['every', 'fill', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'map', 'reduce', 'reduceRight', 'some'], astUtil.getMethodName(node))
}

/**
 * Returns whether or not the node is a call to a lodash collection method in the specified version
 * @param {Object} node
 * @param {number} version
 * @returns {boolean}
 */
function isLodashCollectionMethod(node, version) {
    return node.type === 'CallExpression' && _.includes(methodDataUtil.getCollectionMethods(version), astUtil.getMethodName(node))
}

/**
 * Gets the context's Lodash settings and a function and returns a visitor that calls the function for every Lodash or chain call
 * @param {LodashSettings} settings
 * @param {LodashReporter} reporter
 * @returns {NodeTypeVisitor}
 */
function getLodashMethodVisitor(settings, reporter) {
    return function (node) {
        let iterateeIndex
        if (isLodashChainStart(node, settings.pragma)) {
            let prevNode = node
            node = node.parent.parent
            while (astUtil.getCaller(node) === prevNode && astUtil.isMethodCall(node) && !isChainBreaker(node, settings.version)) {
                iterateeIndex = methodDataUtil.getIterateeIndex(settings.version, astUtil.getMethodName(node))
                reporter(node, node.arguments[iterateeIndex - 1])
                prevNode = node
                node = node.parent.parent
            }
        } else if (isLodashCall(node, settings.pragma)) {
            iterateeIndex = methodDataUtil.getIterateeIndex(settings.version, astUtil.getMethodName(node))
            reporter(node, node.arguments[iterateeIndex])
        }
    }
}

/**
 * Returns whether the node's method call supports using shorthands in the specified version
 * @param {Number} version
 * @param {object} node
 * @returns {boolean}
 */
function methodSupportsShorthand(version, node) {
    return _.includes(methodDataUtil.getShorthandMethods(version), astUtil.getMethodName(node))
}

/**
 * Gets the context, settings, checks whether shorthand is used and can be used, and messages, and returns a visitor
 * @param {RuleContext} context
 * @param {LodashSettings} settings
 * @param {ShorthandChecks} checks
 * @param {ShorthandMessages} messages
 * @returns {NodeTypeVisitor}
 */
function getShorthandVisitor(context, settings, checks, messages) {
    return getLodashMethodVisitor(settings, {
        always(node, iteratee) {
            if (methodSupportsShorthand(settings.version, node) && checks.canUseShorthand(iteratee)) {
                context.report(iteratee, messages.always)
            }
        },
        never(node, iteratee) {
            if (checks.usesShorthand(node, iteratee)) {
                context.report(iteratee || node.callee.property, messages.never)
            }
        }
    }[context.options[0] || 'always'])
}

function isLodashCallToMethod(node, settings, method) {
    return isLodashCall(node, settings.pragma) && isCallToMethod(node, settings.version, method)
}

/**
 * Returns whether the node is a side effect iteration method call (e.g forEach)
 * @param node
 * @param version
 * @returns {boolean}
 */
function isSideEffectIterationMethod(node, version) {
    return _.includes(methodDataUtil.getSideEffectIterationMethods(version), astUtil.getMethodName(node))
}

module.exports = {
    isLodashCall,
    isLodashChainStart,
    isChainable,
    isLodashWrapper,
    isChainBreaker,
    isCallToMethod,
    isLodashCallToMethod,
    isLodashWrapperMethod,
    getIsTypeMethod,
    isLodashCollectionMethod,
    isNativeCollectionMethodCall,
    isImplicitChainStart,
    isExplicitChainStart,
    getLodashMethodVisitor,
    methodSupportsShorthand,
    getShorthandVisitor,
    isSideEffectIterationMethod
}

/**
 @callback LodashReporter
 @param {Object} node
 @param {Object} iteratee
 */

/**
 @callback NodeTypeVisitor
 @param {Object} node
 */

/**
 * @typedef {Object} ShorthandChecks
 * @property {function} canUseShorthand
 * @property {function} usesShorthand
 */

/**
 * @typedef {object} ShorthandMessages
 * @property {string} always
 * @property {string} never
 */
