/**
 * @fileoverview Rule to check if a call to map should be a call to invokeMap
 */
"use strict"
const _ = require("lodash")

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {}
  },

  create(context) {
    const { getLodashMethodVisitors } = require("../util/lodashUtil")


    const getParentIfStatement = n => {
      if (_.get(n, 'parent.type') === "IfStatement") {
        return n.parent
      } else if (_.get(n, "parent.parent.type") === "IfStatement") {
        return n.parent.parent
      }
    }

    const getIsFunctionArgument = node => 
      _.get(node, 'arguments[0].name') || _.get(node, 'arguments[0].property.name')


    const calleeInside = consequentBody => {
      const callee = _.get(consequentBody, 'body[0].expression.callee')
      return _.get(callee, 'property.name') || _.get(callee, 'name')
    }

    const checkSingleCallExpressionInsideIf = (node, consequentBody, suspectedFunctionName) => {

      if (_.get(node, 'parent.type') === 'LogicalExpression') {
        if (_.get(node, 'parent.right.callee.property.name') === 'isFunction') {
          return report(node)
        }
      } else if (calleeInside(consequentBody) === suspectedFunctionName) {
        return report(node)
      }

    }

    const report = node => context.report({node, message: 'Prefer _.invoke(f) over _.isFunction(f) && f()'})


    return getLodashMethodVisitors(context, (node, iteratee, { method, version }) => {
      const parentIf = getParentIfStatement(node)
      if (!parentIf) {
        return
      }

      const consequentBody = _.get(parentIf, 'consequent')
      if (_.get(consequentBody, 'body.length') !== 1) {
        return
      }
      
      if (_.get(consequentBody, 'body[0].expression.type') === 'CallExpression') {
        checkSingleCallExpressionInsideIf(node, consequentBody, getIsFunctionArgument(node))
      }
    }
    )
  }
}