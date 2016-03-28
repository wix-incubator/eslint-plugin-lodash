/**
 * @fileoverview Rule to ensure consistency of aliases of lodash methods
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    var aliases = require('../util/methodDataUtil').getAliasesByVersion(settings.version);

    var expandedAliases = _.reduce(aliases, function (result, aliasesForKey, key) {
        var mapToMainKey = _(aliasesForKey)
            .map(function (alias) {
                return [alias, key];
            })
            .fromPairs()
            .value();
        return _.assign(result, mapToMainKey);
    }, {});

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node) {
            var methodName = astUtil.getMethodName(node);
            if (_.has(expandedAliases, methodName)) {
                context.report({
                    node: node.callee.property,
                    message: "Method '{{old}}' is an alias, for consistency prefer using '{{new}}'",
                    data: {
                        old: methodName,
                        new: expandedAliases[methodName]
                    },
                    fix: function (fixer) {
                        return fixer.replaceText(node.callee.property, expandedAliases[methodName]);
                    }
                });
            }
        })
    };
}
;
