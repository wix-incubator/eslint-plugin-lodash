'use strict'

const _ = require('lodash')

const _methodDataByVersion = {}
const _shorthandMethodsByVersion = {}
function getMethodData(version) {
    _methodDataByVersion[version] = _methodDataByVersion[version] || require(`./methodDataByVersion/${version}`)
    return _methodDataByVersion[version]
}
/**
 * Gets a major version number and method name and returns all its aliases including itself.
 * @param {Number} version
 * @param {string} method
 * @returns {string[]}
 */
function expandAlias(version, method) {
    const methodData = getMethodData(version)
    const aliases = _.keys(_.pickBy(methodData.aliases, x => x === method))
    const wrapperAliases = _.keys(_.pickBy(methodData.wrapperAliases, x => x === method))
    return [method, ...aliases, ...wrapperAliases]
}

/**
 * Gets a major version number and a list of methods and returns a list of methods and all their aliases
 * @param version
 * @param methods
 * @returns {string[]}
 */
function expandAliases(version, methods) {
    return _.flatMap(methods, expandAlias.bind(null, version))
}

/**
 * Gets the raw aliases object for a specific version
 * @param version
 * @returns {Aliases}
 */
function getAliasesByVersion(version) {
    return getMethodData(version).aliases
}

/**
 * Gets a list of all chainable methods and their aliases for a given version
 * @param {Number} version
 * @returns {[string]}
 */
function getChainableAliases(version) {
    return expandAliases(version, getMethodData(version).chainable)
}

/**
 * Gets a list of all lodash collection methods for a specific version
 * @param {Number} version
 * @returns {[string]}
 */
function getCollectionMethods(version) {
    return expandAliases(version, getMethodData(version).shorthand.concat(['reduce', 'reduceRight']))
}

/**
 * Gets a list of methods that support all shorthands per version
 * @param {Number} version
 * @returns {[string]}
 */
function getShorthandMethods(version) {
    return expandAliases(version, getMethodData(version).shorthand)
}
/**
 * Returns whether the node's method call supports using shorthands in the specified version
 * @param {Number} version
 * @param {string} method
 * @returns {boolean}
 */
function methodSupportsShorthand(version, method) {
    if (!_shorthandMethodsByVersion[version]) {
        const methods = getShorthandMethods(version)
        _shorthandMethodsByVersion[version] = _.reduce(methods, (obj, key) => _.assign(obj, {[key]: true}), {})
    }
    return _shorthandMethodsByVersion[version][method]
}

/**
 * Gets a list of all wrapper methods for a specific version
 * @param {Number} version
 * @returns {[string]}
 */
function getWrapperMethods(version) {
    return getMethodData(version).wrapper
}

/**
 * Gets whether the suspect is an alias of the method in a given version
 * @param {Number} version
 * @param {string} method
 * @param {string} suspect
 * @returns {boolean}
 */
function isAliasOfMethod(version, method, suspect) {
    return method === suspect || getMethodData(version).aliases[suspect] === method
}

/**
 * Returns the main alias for the method in the specified version.
 * @param {number} version
 * @param {string} method
 * @returns {string}
 */
function getMainAlias(version, method) {
    return getMethodData(version).aliases[method] || method
}

/**
 * Gets the index of the iteratee of a method when it isn't chained, or -1 if it doesn't have one.
 * @param {number} version
 * @param {string} method
 * @returns {number}
 */
function getIterateeIndex(version, method) {
    const mainAlias = getMainAlias(version, method)
    const iteratees = getMethodData(version).iteratee
    if (_.has(iteratees.differentIndex, mainAlias)) {
        return iteratees.differentIndex[mainAlias]
    }
    if (_.includes(iteratees.any, mainAlias)) {
        return 1
    }
    return -1
}

/**
 * Gets the maximum number of arguments to be given to the function in the specified version
 * @param {number} version
 * @param {string} name
 * @returns {number}
 */
function getFunctionMaxArity(version, name) {
    return getMethodData(version).args[name] || Infinity
}

const sideEffectIterationMethods = ['forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight']

/**
 * Gets a list of side effect iteration methods by version
 * @param {number} version
 * @returns {string[]}
 */
function getSideEffectIterationMethods(version) {
    return expandAliases(version, sideEffectIterationMethods)
}

module.exports = {
    isAliasOfMethod,
    getAliasesByVersion,
    getChainableAliases,
    getShorthandMethods,
    methodSupportsShorthand,
    getWrapperMethods,
    getCollectionMethods,
    getMainAlias,
    getIterateeIndex,
    getFunctionMaxArity,
    getSideEffectIterationMethods
}

/**
 * A hash of all aliases for a Lodash method
 @typedef {Object.<string, [string]>} Aliases
 */

/**
 * A JSON object containing method info for a specific lodash major version
 @typedef {Object} VersionInfo
 @property {Aliases} aliases
 @property {[string]} wrapper
 @property {Object.<string, [string]>} wrapperAliases
 @property {[string]} property
 @property {[string]} chainable
 */