/**
 * @fileoverview Rule to make sure value() wasn't called on a lodash chain twice
 */
'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const getDocsUrl = require('../util/getDocsUrl')

module.exports = {
    meta: {
        docs: {
            url: getDocsUrl('prefer-native-method')
        },
        fixable: 'code'
    },

    create(context) {
        const {getLodashMethodVisitors} = require('../util/lodashUtil')
        const {isAliasOfMethod} = require('../util/methodDataUtil')

        const sourceCode = context.getSourceCode()

        return getLodashMethodVisitors(context, (node, iteratee, {method, version}) => {
            if (isAliasOfMethod(version, 'map', method)) {
                context.report({
                    node,
                    message: 'Prefer \'Array.prototype.map\' over the lodash function.',
                    fix(fixer) {
                        const [firstArg, ...restArgs] = node.arguments
                        return fixer.replaceText(node, `${sourceCode.getText(firstArg)}.map(${restArgs.map(arg => sourceCode.getText(arg)).join(', ')})`)
                    }
                })
            }
        })
    }
}
