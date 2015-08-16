/**
 * @fileoverview Rule to check if the property shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');
    var detectLodash = require('../util/detect-lodash');
    var aliases = require('../util/aliases');

    var matchesProperty = ['find', 'detect', 'filter', 'select', 'reject'];

    function isEq(left, right, itemName) {
        return left.type === 'MemberExpression' &&
            left.object &&
            left.object.name === itemName;
    }

    function shouldPreferMatches(func) {
        if (func.params && func.params.length) {
            var itemName = func.params[0].name;
            var ret = func.body.body[0];
            return ret && ret.type === 'ReturnStatement' &&
                ret.argument.type === 'BinaryExpression' &&
                (isEq(ret.argument.left, ret.argument.right, itemName) || isEq(ret.argument.right, ret.argument.left, itemName));
        }
        return false;
    }

    function shouldNodePreferProp(node, whichArg) {
        return node.arguments && node.arguments.length > whichArg && shouldPreferMatches(node.arguments[whichArg]);
    }

    function isLodashCollectionFunction(node) {
        return _.get(node, 'callee.object.name') === '_' && _.includes(matchesProperty, _.get(node, 'callee.property.name'));
    }

    return {
        CallExpression: function (node) {
            try {
                if (isLodashCollectionFunction(node) && shouldNodePreferProp(node, 1)) {
                    context.report(node.callee.property, 'Prefer matches property syntax');
                } else if (_.includes(matchesProperty, _.get(node, 'callee.property.name')) && detectLodash.isWrapper(node.callee.object) && shouldNodePreferProp(node, 0)) {
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
