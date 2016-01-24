/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    var astUtil = require('../util/astUtil');
    var lodashUtil = require('../util/lodashUtil');
    var lodashPragma = require('../util/settingsUtil').getLodashPragma(context);

    var nilChecks = {
        null: {
            isValue: function isNullLiteral(node) {
                return node.type === 'Literal' && node.value === null;
            },
            expressionChecks: [getLodashTypeChecked.bind(null, 'isNull'), getValueComparedToNil.bind(null, 'null')]
        },
        undefined: {
            isValue: function isUndefinedIdentifier(node) {
                return node.type === 'Identifier' && node.name === 'undefined';
            },
            expressionChecks: [getLodashTypeChecked.bind(null, 'isUndefined'), getValueComparedToNil.bind(null, 'undefined'), getValueWithTypeofUndefinedComparison]
        }
    };

    function getLodashTypeChecked(typecheck, node) {
        return lodashUtil.isLodashCall(node, lodashPragma) && lodashUtil.isCallToMethod(node, typecheck) && node.arguments[0];
    }

    function getValueComparedToNil(nil, node, operator) {
        return node.type === 'BinaryExpression' && node.operator === operator &&
            ((nilChecks[nil].isValue(node.right) && node.left) || (nilChecks[nil].isValue(node.left) && node.right));
    }

    function getTypeofArgument(node) {
        return node.type === 'UnaryExpression' && node.operator === 'typeof' && node.argument;
    }

    function isUndefinedString(node) {
        return node.type === 'Literal' && node.value === 'undefined';
    }

    function getValueWithTypeofUndefinedComparison(node, operator) {
        return node.type === 'BinaryExpression' && node.operator === operator &&
            ((isUndefinedString(node.right) && getTypeofArgument(node.left)) ||
            (isUndefinedString(node.left) && getTypeofArgument(node.right)));
    }

    function checkExpression(nil, operator, node) {
        var valueCompared;
        nilChecks[nil].expressionChecks.some(function (check) {
            valueCompared = check(node, operator);
            return valueCompared;
        });
        return valueCompared;
    }

    function checkNegatedExpression(nil, node) {
        return (astUtil.isNegationExpression(node) && checkExpression(nil, '===', node.argument)) || checkExpression(nil, '!==', node);
    }

    function isEquivalentExistingExpression(node, leftNil, rightNil) {
        var leftExp = checkExpression(leftNil, '===', node.left);
        return leftExp && astUtil.isEquivalentExp(leftExp, checkExpression(rightNil, '===', node.right));
    }

    function isEquivalentExistingNegation(node, leftNil, rightNil) {
        var leftExp = checkNegatedExpression(leftNil, node.left);
        return leftExp && astUtil.isEquivalentExp(leftExp, checkNegatedExpression(rightNil, node.right));
    }

    return {
        LogicalExpression: function (node) {
            if (node.operator === '||') {
                if (isEquivalentExistingExpression(node, 'undefined', 'null') ||
                    isEquivalentExistingExpression(node, 'null', 'undefined')) {
                    context.report(node, 'Prefer isNil over checking for undefined or null.');
                }
            } else if (isEquivalentExistingNegation(node, 'undefined', 'null') ||
                isEquivalentExistingNegation(node, 'null', 'undefined')) {
                context.report(node, 'Prefer isNil over checking for undefined or null.');
            }
        }
    };
};
