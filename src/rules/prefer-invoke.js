/**
 * @fileoverview Rule to check if a call to map should be a call to invokeMap
 */
'use strict'
const _ = require('lodash')
const {isEquivalentMemberExp} = require('../util/astUtil')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {}
    },

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')

        const {isAliasOfMethod} = require('../util/methodDataUtil')

        const isFunction = 'isFunction'
        const report = node => context.report({node, message: 'Prefer _.invoke(f) over _.isFunction(f) && f()'})

        const getIf = node => {
            let relevantIf
            if (_.get(node, 'parent.type') === 'IfStatement') {
                relevantIf = node.parent
            } else if (_.get(node, 'parent.parent.type') === 'IfStatement') {
                relevantIf = node.parent.parent
            }

            const pathsToSearchForIsFunction = ['test.callee.property.name', 'test.property.name', 'test.right.callee.property.name']
            const isFunctionInTestPart = _.find(pathsToSearchForIsFunction, p => _.get(relevantIf, p) === isFunction)
            if (isFunctionInTestPart) {
                return relevantIf
            }
        }




        const calleeInside = consequentBody => 
            _.get(consequentBody, 'expression.callee') ||
        _.get(consequentBody, 'body[0].expression.callee')


        const isEqv = (node, otherNode) => {
            if (otherNode.type === 'Identifier') {
                return _.isEqual(_.get(node, 'name'), _.get(otherNode, 'name'))
            }
            if (_.get(node, 'type') === 'MemberExpression') {
                return isEquivalentMemberExp(node, otherNode)
            } 
        }

        const handleLogicalExpression = (node, consequentBody, suspectedCallee) => {
            if (!_.isEqual(_.get(node, 'parent.right'), node)) {
                return
            }
            if (!_.isEqual(_.get(node, 'parent.operator'), '&&')) {
                return
            }
            if (isEqv(calleeInside(consequentBody), suspectedCallee)) {
                return report(node)
            }
        }

        const checkSingleCallExpressionInsideIf = (node, consequentBody, suspectedCallee) => {
            if (_.get(node, 'parent.type') === 'LogicalExpression') {
                handleLogicalExpression(node, consequentBody, suspectedCallee)
            } else if (isEqv(calleeInside(consequentBody), suspectedCallee)) {
                return report(node)
            }
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (!isAliasOfMethod(version, isFunction, method)) {
                return
            }
            const ifStatement = getIf(node)
            
            if (!ifStatement) {
                return
            }

            const consequentBody = _.get(ifStatement, 'consequent')

            if (_.get(consequentBody, 'body.length') !== 1 && !_.isEqual(_.get(consequentBody, 'expression.type'), 'CallExpression')) {
                return
            }
      

            const args = _.get(node, 'arguments')
            if (args.length !== 1) {
                return
            }
            checkSingleCallExpressionInsideIf(node, consequentBody, args[0])
        }
        )
    }
}