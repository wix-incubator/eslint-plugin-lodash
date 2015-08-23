/**
 * @fileoverview Rule to check if a call to _.forEach should be a call to _.filter
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var aliases = require('../util/aliases');

    function isForEach(node) {
        return aliases.isAliasOfMethod('forEach', astUtil.getMethodName(node));
    }

    function onlyHasAnIfStatement(func) {
        var firstLine = astUtil.getFirstFunctionLine(func);
        return astUtil.hasOnlyOneStatement(func) && firstLine && firstLine.type === 'IfStatement';
    }

    return {
        CallExpression: function (node) {
            if (isForEach(node) && onlyHasAnIfStatement(lodashUtil.getLodashIteratee(node))) {
                context.report(node, 'Prefer _.filter or _.some over an if statement inside a _.forEach');
            }
        }
    };
};
