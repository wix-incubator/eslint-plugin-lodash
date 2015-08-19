/**
 * @fileoverview Rule to check if the file is importing a module from another package which is forbidden
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var aliasMap = require('../util/aliases');
    var NO_NAME = "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'";

    var aliases = _.reduce(aliasMap.ALIASES, function (result, aliasesForKey, key) {
        var mapToMainKey = _.zipObject(aliasesForKey, aliasesForKey.map(_.constant(key)));
        return _.assign(result, mapToMainKey);
    }, {});

    return {
        MemberExpression: function (node) {
            try {
                if (node.object.name === '_' && _.has(aliases, node.property.name)) {
                    context.report(node.property, NO_NAME, {old: node.property.name, new: aliases[node.property.name]});
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};
