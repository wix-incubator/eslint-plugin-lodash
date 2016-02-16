/**
 * @fileoverview Rule to check if there's a JS native method in the lodash chain
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var settings = require('../util/settingsUtil').getSettings(context);
    var objectPathMethods = ['get', 'has', 'hasIn', 'set', 'unset', 'invoke'];
    var _ = require('lodash');


    function getIndexByMethodName(node) {
        if (objectPathMethods.some(lodashUtil.isCallToMethod.bind(null, node, settings.version))) {
            return 1;
        }
        return lodashUtil.isCallToMethod(node, settings.version, 'property') ? 0 : -1;
    }

    function getPropertyPathNode(node) {
        var index = getIndexByMethodName(node);
        return node.arguments[lodashUtil.isLodashCall(node, settings.pragma) ? index : index - 1];
    }

    function isLiteralComplexPath(node) {
        return node.type === 'Literal' && _.isString(node.value) && /[\.\[]/.test(node.value);
    }

    function isShallowPathInArray(node) {
        return node.type === 'ArrayExpression' && node.elements.length === 1;
    }

    function reportMessage(message) {
        return function (node) {
            context.report(node, message);
        };
    }

    var reportIfViolates = {
        'as-needed': _.cond([
            [isLiteralComplexPath, reportMessage('Use an array for deep paths')],
            [isShallowPathInArray, reportMessage('Use a string for single-level paths')]
        ]),
        array: _.cond([
            [_.matches({type: 'Literal'}), reportMessage('Use an array for paths')]
        ]),
        string: _.cond([
            [_.matches({type: 'ArrayExpression'}), reportMessage('Use a string for paths')]
        ])
    };


    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node) {
            var propertyPathNode = getPropertyPathNode(node);
            if (propertyPathNode) {
                reportIfViolates[context.options[0] || 'as-needed'](propertyPathNode);
            }
        })
    };
};

module.exports.schema = [{
    enum: ['as-needed', 'array', 'string']
}];