/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
'use strict'

/**
 * @fileoverview Rule to prefer _.noop over an empty function
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isNegationExpression, isEquivalentExp} = require('../util/astUtil')
        const {isLodashCallToMethod} = require('../util/lodashUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
        const _ = require('lodash')
        const nilChecks = {
            null: {
                isValue: _.matches({type: 'Literal', value: null}),
                expressionChecks: [getLodashTypeCheckedBy('isNull'), getValueComparedTo('null')]
            },
            undefined: {
                isValue: _.matches({type: 'Identifier', name: 'undefined'}),
                expressionChecks: [getLodashTypeCheckedBy('isUndefined'), getValueComparedTo('undefined'), getValueWithTypeofUndefinedComparison]
            }
        }

        function getLodashTypeCheckedBy(typecheck) {
            return function (node) {
                return isLodashCallToMethod(node, settings, typecheck) && node.arguments[0]
            }
        }

        function getValueComparedTo(nil) {
            return function (node, operator) {
                return node.type === 'BinaryExpression' && node.operator === operator &&
                    ((nilChecks[nil].isValue(node.right) && node.left) || (nilChecks[nil].isValue(node.left) && node.right))
            }
        }


        const getTypeofArgument = _.cond([
            [_.matches({type: 'UnaryExpression', operator: 'typeof'}), _.property('argument')]
        ])

        const isUndefinedString = _.matches({type: 'Literal', value: 'undefined'})

        function getValueWithTypeofUndefinedComparison(node, operator) {
            return node.type === 'BinaryExpression' && node.operator === operator &&
                ((isUndefinedString(node.right) && getTypeofArgument(node.left)) ||
                (isUndefinedString(node.left) && getTypeofArgument(node.right)))
        }

        function checkExpression(nil, operator, node) {
            return _(nilChecks[nil].expressionChecks)
                .map(check => check(node, operator))
                .find()
        }

        function checkNegatedExpression(nil, node) {
            return (isNegationExpression(node) && checkExpression(nil, '===', node.argument)) || checkExpression(nil, '!==', node)
        }

        function isEquivalentExistingExpression(node, leftNil, rightNil) {
            const leftExp = checkExpression(leftNil, '===', node.left)
            return leftExp && isEquivalentExp(leftExp, checkExpression(rightNil, '===', node.right))
        }

        function isEquivalentExistingNegation(node, leftNil, rightNil) {
            const leftExp = checkNegatedExpression(leftNil, node.left)
            return leftExp && isEquivalentExp(leftExp, checkNegatedExpression(rightNil, node.right))
        }

        return {
            LogicalExpression(node) {
                if (node.operator === '||') {
                    if (isEquivalentExistingExpression(node, 'undefined', 'null') ||
                        isEquivalentExistingExpression(node, 'null', 'undefined')) {
                        context.report(node, 'Prefer isNil over checking for undefined or null.')
                    }
                } else if (isEquivalentExistingNegation(node, 'undefined', 'null') ||
                    isEquivalentExistingNegation(node, 'null', 'undefined')) {
                    context.report(node, 'Prefer isNil over checking for undefined or null.')
                }
            }
        }
    }
}
