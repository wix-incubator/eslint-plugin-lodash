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
        var mapToMainKey = _.zipObject(aliasesForKey, _.fill(new Array(aliasesForKey.length), key));
        return _.assign(result, mapToMainKey);
    }, {});

    return {
        CallExpression: function (node) {
            var methodName = esUtil.getMethodName(node);
            if ((esUtil.isLodashCall(node) || esUtil.isLodashWrapper(node)) && _.has(aliases, methodName)) {
                context.report(node.callee.property, NO_NAME, {old: methodName, new: aliases[methodName]});
            }
        }
    };
};
