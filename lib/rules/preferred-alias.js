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
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');

    var aliases = _.reduce(aliasMap.ALIASES, function (result, aliasesForKey, key) {
        var mapToMainKey = _.zipObject(aliasesForKey, _.fill(new Array(aliasesForKey.length), key));
        return _.assign(result, mapToMainKey);
    }, {});

    return {
        CallExpression: function (node) {
            var methodName = astUtil.getMethodName(node);
            if ((lodashUtil.isLodashCall(node) || lodashUtil.isLodashWrapper(node)) && _.has(aliases, methodName)) {
                context.report(node.callee.property, "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'", {old: methodName, new: aliases[methodName]});
            }
        }
    };
};
