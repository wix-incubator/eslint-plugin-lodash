/**
 * @fileoverview Rule to check if the matches shorthand can be used
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const getDocsUrl = require('../util/getDocsUrl')

module.exports = {
    meta: {
        docs: {
            url: getDocsUrl('matches-shorthand')
        },
        schema: [{
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
        }]
    },

    create(context) {
        const matches = require('lodash/matches')
        const {isCallToLodashMethod, getShorthandVisitors} = require('../util/lodashUtil')
        const {isEqEqEq, isMemberExpOf, isEqEqEqToMemberOf, getValueReturnedInFirstStatement, getFirstParamName} = require('../util/astUtil')
        const {isEcmaFeatureOn} = require('../util/settingsUtil')
        const DEFAULT_MAX_PROPERTY_PATH_LENGTH = 3
        const onlyLiterals = context.options[3] && context.options[3].onlyLiterals

        const isConjunction = matches({type: 'LogicalExpression', operator: '&&'})

        function canBeObjectLiteralWithShorthandProperty(node, paramName) {
            return isEcmaFeatureOn(context, 'objectLiteralShorthandProperties') && isEqEqEq(node) &&
                (isMemberExpOf(node.left, paramName, {maxLength: 1}) && node.left.property.type === 'Identifier' && node.right.type === 'Identifier' && node.left.property.name === node.right.name ||
                isMemberExpOf(node.right, paramName, {maxLength: 1}) && node.right.property.type === 'Identifier' && node.left.type === 'Identifier' && node.right.property.name === node.left.name)
        }

        function isConjunctionOfEqEqEqToMemberOf(exp, paramName, maxLength) {
            const allowComputed = context.options[2] && isEcmaFeatureOn(context, 'objectLiteralComputedProperties')
            if (isConjunction(exp) || canBeObjectLiteralWithShorthandProperty(exp, paramName)) {
                const checkStack = [exp]
                let curr
                let allParamMemberEq = true
                curr = checkStack.pop()
                while (curr) {
                    if (isConjunction(curr)) {
                        checkStack.push(curr.left, curr.right)
                    } else if (!isEqEqEqToMemberOf(curr, paramName, {maxLength, allowComputed, onlyLiterals})) {
                        allParamMemberEq = false
                    }
                    curr = checkStack.pop()
                }
                return allParamMemberEq
            }
        }

        function isFunctionDeclarationThatCanUseShorthand(func) {
            const maxPropertyPathLength = context.options[1] || DEFAULT_MAX_PROPERTY_PATH_LENGTH
            return isConjunctionOfEqEqEqToMemberOf(getValueReturnedInFirstStatement(func), getFirstParamName(func), maxPropertyPathLength)
        }

        function canUseShorthand(iteratee, lodashContext) {
            return isFunctionDeclarationThatCanUseShorthand(iteratee) || isCallToLodashMethod(iteratee, 'matches', lodashContext)
        }

        function usesShorthand(node, iteratee) {
            return iteratee && iteratee.type === 'ObjectExpression'
        }


        return getShorthandVisitors(context, {
            canUseShorthand,
            usesShorthand
        }, {
            always: 'Prefer matches syntax',
            never: 'Do not use matches syntax'
        })
    }
}
