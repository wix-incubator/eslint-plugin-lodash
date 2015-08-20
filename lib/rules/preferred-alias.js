/**
 * @fileoverview Rule to ensure consistency of aliases of lodash methods
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var aliasMap = require('../util/aliases');
    var esUtil = require('../util/esUtil');
    var NO_NAME = "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'";

    var aliases = _.reduce(aliasMap.ALIASES, function (result, aliasesForKey, key) {
        var mapToMainKey = _.zipObject(aliasesForKey, aliasesForKey.map(_.constant(key)));
        return _.assign(result, mapToMainKey);
    }, {});

    return {
        CallExpression: function (node) {
            try {
                if ((esUtil.isLodashCall(node) && _.has(aliases, node.callee.property.name)) ||
                    (esUtil.isLodashWrapper(node.callee.object) && _.has(aliases, node.callee.property.name))) {
                    context.report(node.callee.property, NO_NAME, {old: node.callee.property.name, new: aliases[node.callee.property.name]});
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e + ' ' + e.stack);
            }
        }
    };
};
