/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

//var _ = require('lodash');
//var aliasMap = require('../util/aliases');

function isLodashChainStart(node) {
    return node.type === 'CallExpression' && node.callee.name === '_';
}

function isWrapper(node) {
    if (isLodashChainStart(node)) {
        return true;
    }
    return node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && /*node.callee.property === 'method in the chaining list' &&*/ isWrapper(node.callee.object);
}

module.exports = {
    isLodashChainStart: isLodashChainStart,
    isWrapper: isWrapper
};
