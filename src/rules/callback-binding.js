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
        const {getLodashMethodVisitor, isCallToMethod} = require('../util/lodashUtil')
        const {getMethodName} = require('../util/astUtil')
        const settings = require('../util/settingsUtil').getSettings(context)
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
            4(node, iteratee) {
                const isTransformerMethod = transformerMethods.some(isCallToMethod.bind(null, node, settings.version))
                const iterateeIndex = node.arguments.indexOf(iteratee)
                if (iterateeIndex !== -1 && (isTransformerMethod && node.arguments[iterateeIndex + 2] || (!isTransformerMethod && node.arguments[iterateeIndex + 1]))) {
                    context.report(iteratee, 'Do not use Lodash 3 thisArg, use binding instead')
                }
            }
        }

        return {
            CallExpression: getLodashMethodVisitor(settings, callExpressionReporters[settings.version])
        }
    }
}
