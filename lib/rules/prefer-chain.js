/**
 * @fileoverview Rule to check if the file is importing a module from another package which is forbidden
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var NO_NAME = 'Prefer chaining to composition';

    return {
        CallExpression: function (node) {
            try {
                if (node.callee.object && node.callee.object.name === '_' && node.arguments.length > 0 &&
                    node.arguments[0].type === 'CallExpression' && node.arguments[0].callee.type === 'MemberExpression' && node.arguments[0].callee.object.name === '_') {
                    //var fileName = context.getFilename();
                    //context.report(node.property, NO_NAME, {old: 'each', new: 'forEach'});
                    context.report(node.arguments[0].callee.object, NO_NAME);
                }
            } catch (e) {
                context.report(node, 'Error executing rule: ' + e);
            }
        }
    };
};
