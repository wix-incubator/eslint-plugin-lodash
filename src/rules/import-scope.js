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

const {isFullLodashImport, getNameFromCjsRequire, getMethodImportFromName} = require('../util/importUtil')
const every = require('lodash/every')

const messages = {
    method: 'Do not import from the full Lodash module.',
    member: 'Import members from the full Lodash module.',
    full: 'Use the full Lodash module'
}

const importNodeTypes = {
    method: 'ImportDefaultSpecifier',
    member: 'ImportSpecifier',
    full: 'ImportDefaultSpecifier'
}

const isMethodImport = name => Boolean(getMethodImportFromName(name))

module.exports = {
    meta: {
        schema: [{
            enum: ['method', 'member', 'full']
        }]
    },
    create(context) {
        const importType = context.options[0] || 'method'

        return {
            ImportDeclaration(node) {
                if (isFullLodashImport(node.source.value)) {
                    if (importType === 'method') {
                        context.report(node, messages.method)
                    } else {
                        const type = importNodeTypes[importType]
                        if (!every(node.specifiers, {type})) {
                            context.report(node, messages[importType])
                        }
                    }
                } else if (isMethodImport(node.source.value) && importType !== 'method') {
                    context.report(node, messages[importType])
                }
            },
            VariableDeclarator(node) {
                const name = getNameFromCjsRequire(node.init)
                if (isFullLodashImport(name)) {
                    if (importType === 'method') {
                        context.report(node, messages.method)
                    } else {
                        const isObjectPattern = node.id.type === 'ObjectPattern'
                        const isMemberImport = importType === 'member'
                        if (isObjectPattern !== isMemberImport) {
                            context.report(node, messages[importType])
                        }
                    }
                } else if (isMethodImport(name) && importType !== 'method') {
                    context.report(node, messages[importType])
                }
            }
        }
    }
}
