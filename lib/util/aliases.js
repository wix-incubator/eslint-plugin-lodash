'use strict';

var _ = require('lodash');

var ALIASES = {
    forEach: ['each'],
    assign: ['extend'],
    first: ['head'],
    zipObject: ['object'],
    rest: ['tail'],
    uniq: ['unique'],
    reduce: ['foldl', 'inject'],
    reduceRight: ['foldr'],
    some: ['any'],
    map: ['collect'],
    includes: ['contains', 'include'],
    flowRight: ['backflow', 'compose'],
    isEqual: ['eq'],
    every: ['all'],
    find: ['detect'],
    forEachRight: ['eachRight'],
    filter: ['select'],
    functions: ['methods'],
    callback: ['iteratee']
};

var WRAPPER_ALIASES = {
    value: ['run', 'toJSON', 'valueOf']
};

var property = ['dropRightWhile', 'dropWhile', 'findIndex', 'findLastIndex', 'remove', 'sortedIndex', 'sortedIndex',
                'map', 'takeRightWhile', 'takeWhile', 'uniq', 'countBy', 'every', 'filter', 'find', 'result', 'groupBy', 'indexBy', 'partition', 'reject', 'some', 'sortBy',
                'sortByOrder', 'max', 'min', 'sum', 'findKey', 'findLastKey', 'mapValues'];

var CHAINABLE = [
    'after', 'ary', 'assign', 'at', 'before', 'bind', 'bindAll', 'bindKey', 'callback', 'chain', 'chunk', 'commit', 'compact', 'concat', 'constant', 'countBy', 'create', 'curry',
    'debounce', 'defaults', 'defaultsDeep', 'defer', 'delay', 'difference', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'fill', 'filter', 'flatten', 'flattenDeep', 'flow',
    'flowRight', 'forEach', 'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'functions', 'groupBy', 'indexBy', 'initial', 'intersection', 'invert', 'invoke', 'keys',
    'keysIn', 'map', 'mapKeys', 'mapValues', 'matches', 'matchesProperty', 'memoize', 'merge', 'method', 'methodOf', 'mixin', 'modArgs', 'negate', 'omit', 'once', 'pairs', 'partial',
    'partialRight', 'partition', 'pick', 'plant', 'pluck', 'property', 'propertyOf', 'pull', 'pullAt', 'push', 'range', 'rearg', 'reject', 'remove', 'rest', 'restParam', 'reverse', 'set',
    'shuffle', 'slice', 'sort', 'sortBy', 'sortByAll', 'sortByOrder', 'splice', 'spread', 'take', 'takeRight', 'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'toArray',
    'toPlainObject', 'transform', 'union', 'uniq', 'unshift', 'unzip', 'unzipWith', 'values', 'valuesIn', 'where', 'without', 'wrap', 'xor', 'zip', 'zipObject', 'zipWith'];

function expandAlias(method) {
    return method in ALIASES ? ALIASES[method].concat(method) : [method];
}

function expandAliases(methods) {
    return _(methods).map(expandAlias).flatten().value();
}

var CHAINABLE_ALIASES = expandAliases(CHAINABLE);

var supportsProp = expandAliases(property);


module.exports = {
    ALIASES: ALIASES,
    CHAINABLE: CHAINABLE,
    CHAINABLE_ALIASES: CHAINABLE_ALIASES,
    WRAPPER_ALIASES: WRAPPER_ALIASES,
    supportsProp: supportsProp
};
