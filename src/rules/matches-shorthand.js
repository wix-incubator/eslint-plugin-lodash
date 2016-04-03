/**
 * @fileoverview Rule to check if the matches shorthand can be used
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const _ = require('lodash')
    const astUtil = require('../util/astUtil')
    const settingsUtil = require('../util/settingsUtil')
    const settings = settingsUtil.getSettings(context)
    const DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3
    const onlyLiterals = context.options[3] && context.options[3].onlyLiterals

    const isConjunction = _.matches({type: 'LogicalExpression', operator: '&&'})

    function canBeObjectLiteralWithShorthandProperty(node, paramName) {
        return settingsUtil.isEcmaFeatureOn(context, 'objectLiteralShorthandProperties') && astUtil.isEqEqEq(node) &&
            (astUtil.isMemberExpOf(node.left, paramName, 1) && node.left.property.type === 'Identifier' && node.right.type === 'Identifier' && node.left.property.name === node.right.name ||
            astUtil.isMemberExpOf(node.right, paramName, 1) && node.right.property.type === 'Identifier' && node.left.type === 'Identifier' && node.right.property.name === node.left.name)
    }

    function isConjunctionOfEqEqEqToMemberOf(exp, paramName, maxPropertyPathLength) {
        const allowComputed = context.options[2] && settingsUtil.isEcmaFeatureOn(context, 'objectLiteralComputedProperties')
        if (isConjunction(exp) || canBeObjectLiteralWithShorthandProperty(exp, paramName)) {
            const checkStack = [exp]
            let curr
            let allParamMemberEq = true
            curr = checkStack.pop()
            while (curr) {
                if (isConjunction(curr)) {
                    checkStack.push(curr.left, curr.right)
                } else if (!astUtil.isEqEqEqToMemberOf(curr, paramName, maxPropertyPathLength, allowComputed, onlyLiterals)) {
                    allParamMemberEq = false
                }
                curr = checkStack.pop()
            }
            return allParamMemberEq
        }
    }

    function isFunctionDeclarationThatCanUseShorthand(func) {
        const maxPropertyPathLength = context.options[1] || DEFAULT_MAX_PROPERTY_PATH_LENGTH
        return isConjunctionOfEqEqEqToMemberOf(astUtil.getValueReturnedInFirstLine(func), astUtil.getFirstParamName(func), maxPropertyPathLength)
    }

    function canUseShorthand(iteratee) {
        return isFunctionDeclarationThatCanUseShorthand(iteratee) || lodashUtil.isLodashCallToMethod(iteratee, settings, 'matches')
    }

    function usesShorthand(node, iteratee) {
        return iteratee && iteratee.type === 'ObjectExpression'
    }


    return {
        CallExpression: lodashUtil.getShorthandVisitor(context, settings, {
            canUseShorthand,
            usesShorthand
        }, {
            always: 'Prefer matches syntax',
            never: 'Do not use matches syntax'
        })
    }
}

module.exports.schema = [
    {
        enum: ['always', 'never']
    }, {
        type: 'integer',
        minimum: 1
    }, {
        type: 'boolean'
    }, {
      type: 'object',
      properties: {
          onlyLiterals: {
              type: 'boolean'
          }
      }
    }
]
