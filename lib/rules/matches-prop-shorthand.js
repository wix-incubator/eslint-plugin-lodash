/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var esUtil = require('../util/esUtil');

    var SUPPORT_MATCHES = ['find', 'detect', 'filter', 'select', 'reject'];

    function isEq(left, itemName) {
        return left.type === 'MemberExpression' && esUtil.isMemberExpOfArg(left, itemName);
    }

    function shouldPreferMatches(func) {
        if (func.params && func.params.length) {
            var itemName = func.params[0].name;
            var ret = func.body.body[0];
            return ret && ret.type === 'ReturnStatement' &&
                ret.argument.type === 'BinaryExpression' &&
                ret.argument.operator === '===' &&
                (isEq(ret.argument.left, itemName) || isEq(ret.argument.right, itemName));
        }
        return false;
    }

    function shouldNodePreferProp(node, whichArg) {
        return node.arguments && node.arguments.length > whichArg && shouldPreferMatches(node.arguments[whichArg]);
    }

    function isLodashCollectionFunction(node) {
        return esUtil.isLodashCall(node) && _.includes(SUPPORT_MATCHES, esUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            try {
                if ((isLodashCollectionFunction(node) && shouldNodePreferProp(node, 1)) ||
                    (_.includes(SUPPORT_MATCHES, esUtil.getMethodName(node)) && esUtil.isLodashWrapper(node.callee.object) && shouldNodePreferProp(node, 0))) {
                    context.report(node.callee.property, 'Prefer matches property syntax');
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
