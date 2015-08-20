/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var aliasMap = require('../util/aliases');
    var esUtil = require('../util/esUtil');

    function shouldPreferProp(func) {
        if (func.type === 'FunctionExpression' && func.params.length) {
            var ret = func.body.body[0];
            return ret && ret.type === 'ReturnStatement' && isMemberExpOfArg(ret.argument, func.params[0].name);
        }
        return false;
    }

    /**
     * is member access that is not by index or by a variable e.g.
     *  a.b or a['b']
     *  but not:
     *  a[0], a[var], a[exp...]
     * @param node
     * @return {boolean}
     */
    function isPropAccess(node) {
        return node &&
            (node.computed === false) ||
            (node.computed === true && node.property.type === 'Literal' && _.isString(node.property.value));
    }

    function isMemberExpOfArg(node, argName) {
        return node.type === 'MemberExpression' && node.object && node.object.name === argName && isPropAccess(node);
    }

    function shouldNodePreferProp(node, whichArg) {
        return node.arguments && node.arguments.length > whichArg && shouldPreferProp(node.arguments[whichArg]);
    }

    function isPropShorthandMethod(node) {
        return _.includes(aliasMap.supportsProp, esUtil.getMethodName(node));
    }

    function isLodashCollectionFunction(node) {
        return esUtil.isLodashCall(node) && isPropShorthandMethod(node);
    }

    return {
        CallExpression: function (node) {
            try {
                if ((isLodashCollectionFunction(node) && shouldNodePreferProp(node, 1)) ||
                    (isPropShorthandMethod(node) && esUtil.isLodashWrapper(node.callee.object) && shouldNodePreferProp(node, 0))) {
                    context.report(node.callee.property, 'Prefer property shorthand syntax');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
