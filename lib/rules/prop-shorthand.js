/**
 * @fileoverview Rule to check if the file is importing a module from another package which is forbidden
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var _ = require('lodash');

    function shouldPreferPluck(func) {
        if (func.params.length) {
            var itemName = func.params[0].name;
            var ret = func.body.body[0];
            return ret && ret.type === 'ReturnStatement' && ret.argument.type === 'MemberExpression' && ret.argument.object && ret.argument.object.name === itemName;
        }
        return false;
    }

    function isLodashCollectionFunction(node) {
        return _.get(node, 'callee.object.name') === '_' && _.get(node, 'callee.property.name') === 'map';
    }

    function isLodashChainStart(node) {
        return node.type === 'CallExpression' && node.callee.name === '_';
    }

    function isWrapper(node) {

    }

    return {
        CallExpression: function (node) {
            try {
                if (node.callee.name === '_') {
                    //start of lodash chain
                    var parent = node.parent;
                    //while (parent.type === 'MemberExpression') {

                    //}
                } else if (isLodashCollectionFunction(node) && node.arguments.length > 1 && node.arguments[1].type === 'FunctionExpression' && shouldPreferPluck(node.arguments[1])) {
                    context.report(node.callee.property, 'Prefer pluck syntax');
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        //},
        //MemberExpression: function (node) {
        //    try {
        //        if (node.property.name === 'map') {
        //            context.report(node.property, 'Dont use map in chain');
        //        }
        //    } catch (e) {
        //        context.report(node, 'Error executing rule: ' + e);
        //    }
        }
    };
};

module.exports.schema = [
    // JSON Schema for rule options goes here
];
