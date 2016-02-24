/**
 * @fileoverview Rule to check if the matches shorthand can be used
 */
'use strict';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    var lodashUtil = require('../util/lodashUtil');
    var _ = require('lodash');
    var astUtil = require('../util/astUtil');
    var settingsUtil = require('../util/settingsUtil');
    var settings = settingsUtil.getSettings(context);
    var DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3;

    var isConjunction = _.matches({type: 'LogicalExpression', operator: '&&'});

    function canBeObjectLiteralWithShorthandProperty(node, paramName) {
        return settingsUtil.isEcmaFeatureOn(context, 'objectLiteralShorthandProperties') && astUtil.isEqEqEq(node) &&
            (astUtil.isMemberExpOf(node.left, paramName, 1) && node.left.property.type === 'Identifier' && node.right.type === 'Identifier' && node.left.property.name === node.right.name ||
            astUtil.isMemberExpOf(node.right, paramName, 1) && node.right.property.type === 'Identifier' && node.left.type === 'Identifier' && node.right.property.name === node.left.name);
    }

    function isConjunctionOfEqEqEqToMemberOf(exp, paramName, maxPropertyPathLength) {
        var allowComputed = context.options[2] && settingsUtil.isEcmaFeatureOn(context, 'objectLiteralComputedProperties');
        if (isConjunction(exp) || canBeObjectLiteralWithShorthandProperty(exp, paramName)) {
            var checkStack = [exp];
            var curr;
            var allParamMemberEq = true;
            curr = checkStack.pop();
            while (curr) {
                if (isConjunction(curr)) {
                    checkStack.push(curr.left, curr.right);
                } else if (!astUtil.isEqEqEqToMemberOf(curr, paramName, maxPropertyPathLength, allowComputed)) {
                    allParamMemberEq = false;
                }
                curr = checkStack.pop();
            }
            return allParamMemberEq;
        }
    }

    function isFunctionDeclarationThatCanUseShorthand(func) {
        var maxPropertyPathLength = context.options[1] || DEFAULT_MAX_PROPERTY_PATH_LENGTH;
        return isConjunctionOfEqEqEqToMemberOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), maxPropertyPathLength);
    }

    function isCallToLodashMatches(iteratee) {
        return lodashUtil.isLodashCall(iteratee, settings.pragma) && lodashUtil.isCallToMethod(iteratee, settings.version, 'matches');
    }

    function canUseShorthand(iteratee) {
        return isFunctionDeclarationThatCanUseShorthand(iteratee) || isCallToLodashMatches(iteratee);
    }

    function usesShorthand(node, iteratee) {
        return iteratee && iteratee.type === 'ObjectExpression';
    }


    return {
        CallExpression: lodashUtil.getShorthandVisitor(context, settings, {
            canUseShorthand: canUseShorthand,
            usesShorthand: usesShorthand
        }, {
            always: 'Prefer matches syntax',
            never: 'Do not use matches syntax'
        })
    };
};

module.exports.schema = [
    {
        enum: ['always', 'never']
    },
    {
        type: 'integer',
        minimum: 1
    }, {
        type: 'boolean'
    }
];
