/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var esUtil = require('../util/esUtil');
    var aliases = require('../util/aliases');

    function isForEach(node) {
        return aliases.isAliasOfMethod('forEach', esUtil.getMethodName(node));
    }

    function onlyHasAnIfStatement(func) {
        var firstLine = esUtil.getFirstFunctionLine(func);
        return esUtil.hasOnlyOneStatement(func) && firstLine && firstLine.type === 'IfStatement';
    }

    return {
        CallExpression: function (node) {
            if (isForEach(node) && onlyHasAnIfStatement(esUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.filter or _.some over an if statement inside a _.forEach');
            }
        }
    };
};
