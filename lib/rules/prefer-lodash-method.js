/**
 * @fileoverview Rule to check if there's a method in the chain start that can be in the chain
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
    var REPORT_MESSAGE = 'Prefer \'_.{{method}}\' over the native function.';
    var exceptions = _.get(context, ['options', 0, 'except'], []);

    function isStaticNativeMethodCall(node) {
        var staticMethods = {
            Object: ['assign', 'create', 'keys', 'values'],
            Array: ['isArray']
        };
        var callerName = _.get(node, 'callee.object.name');
        return (callerName in staticMethods) && _.includes(staticMethods[callerName], astUtil.getMethodName(node));
    }

    function isUsingLodash(node) {
        return lodashUtil.isLodashCall(node, settings.pragma) || lodashUtil.isLodashWrapper(astUtil.getCaller(node), settings.pragma, settings.version);
    }

    function canUseLodash(node) {
        return lodashUtil.isNativeCollectionMethodCall(node) || isStaticNativeMethodCall(node);
    }

    function isRuleException(node) {
        return _.includes(exceptions, astUtil.getMethodName(node));
    }

    return {
        CallExpression: function (node) {
            if (!isRuleException(node) && canUseLodash(node) && !isUsingLodash(node)) {
                context.report(node, REPORT_MESSAGE, {method: astUtil.getMethodName(node)});
            }
        }
    };
};

module.exports.schema = [
    {
        type: 'object',
        properties: {
            except: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        }
    }
];