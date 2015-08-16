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

    function shouldNodePreferProp(node, whichArg) {
        return node.arguments && node.arguments.length > whichArg && shouldPreferProp(node.arguments[whichArg]);
    }

    function shouldPreferProp(func) {
        if (func.type === 'FunctionExpression' && func.params.length) {
            var itemName = func.params[0].name;
            var ret = func.body.body[0];
            return ret && ret.type === 'ReturnStatement' && ret.argument.type === 'MemberExpression' && ret.argument.object && ret.argument.object.name === itemName;
        }
        return false;
    }

    //function isInSupports(name) {
    //    return _.includes(aliasMap.supportsProp, name);
    //}

    function isLodashCollectionFunction(node) {
        return _.get(node, 'callee.object.name') === '_' && _.includes(aliasMap.supportsProp, _.get(node, 'callee.property.name'));
    }

    function isLodashChainStart(node) {
        return node.type === 'CallExpression' && node.callee.name === '_';
    }

    function isWrapper(node) {
        if (isLodashChainStart(node)) {
            return true;
        }
        return node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && /*node.callee.property === 'method in the chaining list' &&*/ isWrapper(node.callee.object);
    }

    return {
        CallExpression: function (node) {
            try {
                if (isLodashCollectionFunction(node) && shouldNodePreferProp(node, 1)) {
                    context.report(node.callee.property, 'Prefer property shorthand syntax');
                } else if (_.includes(aliasMap.supportsProp, _.get(node, 'callee.property.name')) && shouldNodePreferProp(node, 0) && isWrapper(node.callee.object)) {
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
