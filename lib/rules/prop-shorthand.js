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
            return ret && ret.type === 'ReturnStatement' && esUtil.isMemberExpOfArg(ret.argument, func.params[0].name);
        }
        return false;
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
