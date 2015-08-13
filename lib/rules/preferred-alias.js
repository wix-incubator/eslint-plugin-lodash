/**
 * @fileoverview Rule to check if the file is importing a module from another package which is forbidden
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var NO_NAME = "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'";
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

    var CHAIN = {
        value: ['run', 'toJSON', 'valueOf']
    };

    var _ = require('lodash');

    var aliases = _.reduce(ALIASES, function (result, n, key) {
        _.forEach(n, function (v) {
            result[v] = key;
        });
        return result;
    }, {});

    return {
        MemberExpression: function (node) {
            try {
                if (node.object.name === '_' && _.has(aliases, node.property.name)) {
                    //var vars = context.getDeclaredVariables(node);
                        //var fileName = context.getFilename();
                    context.report(node.property, NO_NAME, {old: node.property.name, new: aliases[node.property.name]});
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};
