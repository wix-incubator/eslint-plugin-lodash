/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
'use strict'

/**
 * @fileoverview Rule to disallow the use of a chain for a single method
 */
// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {getMethodName} = require('../util/astUtil')
        const {version} = require('../util/settingsUtil').getSettings(context)
        const transformerMethods = ['reduce', 'reduceRight', 'transform']

        function isBound(node) {
            return node && node.type === 'CallExpression' && getMethodName(node) === 'bind' && node.arguments.length === 1
        }

        const callExpressionReporters = {
            3(node, iteratee) {
                if (isBound(iteratee)) {
                    context.report(iteratee.callee.property, 'Unnecessary bind, pass `thisArg` to lodash method instead')
                }
            },
            4(node, iteratee, {method}) {
                const isTransformerMethod = transformerMethods.includes(method)
                const iterateeIndex = node.arguments.indexOf(iteratee)
                if (iterateeIndex !== -1 && (isTransformerMethod && node.arguments[iterateeIndex + 2] || (!isTransformerMethod && node.arguments[iterateeIndex + 1]))) {
                    context.report(iteratee, 'Do not use Lodash 3 thisArg, use binding instead')
                }
            }
        }

        return getLodashMethodVisitors(context, callExpressionReporters[version])
    }
}
