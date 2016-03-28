/**
 * @fileoverview Rule to check if a call to _.map should be a call to _.times
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
    const lodashUtil = require('../util/lodashUtil')
    const _ = require('lodash')
    const callStack = []
    const settings = require('../util/settingsUtil').getSettings(context)


    function getObjectPatternProperties(node) {
        return _.flatMap(node.properties, prop => {
            if (prop.shorthand) {
                return prop.key.name
            }
            if (prop.value.type === 'Identifier') {
                return prop.value.name
            }
            return getObjectPatternProperties(prop.value)
        })
    }

    const getParamNames = _.cond([
        [_.matches({type: 'Identifier'}), _.property('name')],
        [_.matches({type: 'ObjectPattern'}), getObjectPatternProperties]
    ])

    function handleFunctionExpression(node) {
        if (lodashUtil.isCallToMethod(node.parent, settings.version, 'map') && (lodashUtil.isLodashCall(node.parent, settings.pragma) || lodashUtil.isLodashWrapper(node.parent, settings.pragma, settings.version))) {
            callStack.push({func: node, params: _.flatMap(node.params, getParamNames), anyUsed: false})
        }
    }

    function handleExitFunctionExpression(node) {
        const state = _.last(callStack)
        if (state && state.func === node) {
            callStack.pop()
            if (!state.anyUsed) {
                context.report(node.parent, 'Prefer _.times over _.map without using arguments')
            }
        }
    }

    return {
        FunctionExpression: handleFunctionExpression,
        ArrowFunctionExpression: handleFunctionExpression,
        Identifier(node) {
            const state = _.last(callStack)
            if (state) {
                const isIterateeParamDefinition = (node.parent === state.func && _.includes(node.parent.params, node)) ||
                    (node.parent.type === 'AssignmentPattern' && node.parent.parent === state.func)
                if (!isIterateeParamDefinition && _.includes(state.params, node.name)) {
                    state.anyUsed = true
                }
            }
        },
        'FunctionExpression:exit': handleExitFunctionExpression,
        'ArrowFunctionExpression:exit': handleExitFunctionExpression
    }
}
