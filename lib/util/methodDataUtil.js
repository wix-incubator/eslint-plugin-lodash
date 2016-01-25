'use strict';

var _ = require('lodash');

/**
 * @type {VersionInfo}
 */
var methodDataByVersion = require('./methodDataByVersion');

/**
 * Gets a major version number and method name and returns all its aliases including itself.
 * @param {Number} version
 * @param {String} method
 * @returns {[String]}
 */
function expandAlias(version, method) {
    var methodData = methodDataByVersion[version];
    return [method].concat(methodData.aliases[method] || methodData.wrapperAliases[method] || []);
}

/**
 * Gets a major version number and a list of methods and returns a list of methods and all their aliases
 * @param version
 * @param methods
 * @returns {Array}
 */
function expandAliases(version, methods) {
    return _.flatMap(methods, expandAlias.bind(null, version));
}

/**
 * Gets the raw aliases object for a specific version
 * @param version
 * @returns {Aliases}
 */
function getAliasesByVersion(version) {
    return methodDataByVersion[version].aliases;
}

/**
 * Gets a list of all chainable methods and their aliases for a given version
 * @param {Number} version
 * @returns {[string]}
 */
function getChainableAliases(version) {
    return expandAliases(version, methodDataByVersion[version].chainable);
}

/**
 * Gets a list of all lodash collection methods for a specific version
 * @param {Number} version
 * @returns {[string]}
 */
function getCollectionMethods(version) {
    return expandAliases(version, methodDataByVersion[version].property.concat(['reduce', 'reduceRight']));
}

/**
 * Gets a list of methods that support property shorthand per version
 * @param {Number} version
 * @returns {[string]}
 */
function getPropShorthandMethods(version) {
    return expandAliases(version, methodDataByVersion[version].property);
}

/**
 * Gets a list of all wrapper methods for a specific version
 * @param {Number} version
 * @returns {[string]}
 */
function getWrapperMethods(version) {
    return methodDataByVersion[version].wrapper;
}

/**
 * Gets whether the suspect is an alias of the method in a given version
 * @param {Number} version
 * @param {string} method
 * @param {string} suspect
 * @returns {boolean}
 */
function isAliasOfMethod(version, method, suspect) {
    return _.includes(expandAlias(version, method), suspect);
}

module.exports = {
    isAliasOfMethod: isAliasOfMethod,
    getAliasesByVersion: getAliasesByVersion,
    getChainableAliases: getChainableAliases,
    getPropShorthandMethods: getPropShorthandMethods,
    getWrapperMethods: getWrapperMethods,
    getCollectionMethods: getCollectionMethods
};

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