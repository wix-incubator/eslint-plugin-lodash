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

        const relevantMethods = ['isFunction', 'get', 'has']
        const report = node => context.report({node, message: 'Prefer _.invoke(f) over _.isFunction(f) && f()'})

        const getIf = node => {
            if (_.get(node, 'parent.type') === 'IfStatement') {
                return node.parent
            } else if (_.get(node, 'parent.parent.type') === 'IfStatement') {
                return node.parent.parent
            }
        }




        const calleeInside = consequentBody => 
            _.get(consequentBody, 'expression.callee') ||
        _.get(consequentBody, 'body[0].expression.callee')



        const checkSingleCallExpressionInsideIf = (node, consequentBody, susspectedCalle) => {
            if (_.get(node, 'parent.type') === 'LogicalExpression') {
                if (relevantMethods.includes(_.get(node, 'parent.right.callee.property.name'))) {
                    return report(node)
                }
            } else if (isEquivalentMemberExp(calleeInside(consequentBody), susspectedCalle) && _.includes(relevantMethods, _.get(node, 'callee.property.name'))) {
                return report(node)
            }
        }

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (!_.find(relevantMethods, m => isAliasOfMethod(version, m, method))) {
                return
            }
            const ifStatement = getIf(node)
            if (!ifStatement) {
                return
            }

            const consequentBody = _.get(ifStatement, 'consequent')
            if (_.get(consequentBody, 'body.length') !== 1 && !_.chain(consequentBody).get('expression.type').isEqual('CallExpression').value()) {
                return
            }
      
            checkSingleCallExpressionInsideIf(node, consequentBody, _.get(node, 'arguments[0]'))
        }
        )
    }
}