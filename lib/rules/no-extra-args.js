/**
 * @fileoverview Rule to disallow using _.prototype.commit.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var settings = require('../util/settingsUtil').getSettings(context);
    var lodashUtil = require('../util/lodashUtil');
    var astUtil = require('../util/astUtil');
    var methodDataUtil = require('../util/methodDataUtil');

    function getExpectedArity(node) {
        var maxArity = methodDataUtil.getFunctionMaxArity(settings.version, astUtil.getMethodName(node));
        return Math.max(lodashUtil.isLodashCall(node, settings.pragma) ? maxArity : maxArity - 1, 0);
    }

    return {
        CallExpression: lodashUtil.getLodashMethodVisitor(settings, function (node) {
            var expectedArity = getExpectedArity(node);
            if (node.arguments.length > expectedArity) {
                context.report({
                    node: node,
                    message: 'Too many arguments passed to `{{method}}` (expected {{expectedArity}}).',
                    data: {method: astUtil.getMethodName(node), expectedArity: expectedArity}
                });
            }
        })
    };
};
