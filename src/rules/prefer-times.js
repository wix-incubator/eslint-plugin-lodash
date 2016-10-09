/**
 * @fileoverview Rule to check if a call to map should be a call to times
 */
'use strict'

/**
 * @fileoverview Rule to check if a call to map should be a call to times
 */
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {isCallToMethod, isLodashCall, isLodashWrapper} = require('../util/lodashUtil')
        const [flatMap, cond, matches, property, last, findLast, includes, set] = 
            ['flatMap', 'cond', 'matches', 'property', 'last', 'findLast', 'includes', 'set'].map(m => require(`lodash/${m}`))
        const callStack = []
        const settings = require('../util/settingsUtil').getSettings(context)


        function getObjectPatternProperties(node) {
            return flatMap(node.properties, prop => {
                if (prop.shorthand) {
                    return prop.key.name
                }
                if (prop.value.type === 'Identifier') {
                    return prop.value.name
                }
                return getObjectPatternProperties(prop.value)
            })
        }

        const getParamNames = cond([
            [matches({type: 'Identifier'}), property('name')],
            [matches({type: 'ObjectPattern'}), getObjectPatternProperties]
        ])

        function handleFunctionExpression(node) {
            if (isCallToMethod(node.parent, settings.version, 'map') && (isLodashCall(node.parent, settings.pragma) || isLodashWrapper(node.parent, settings.pragma, settings.version))) {
                callStack.push({func: node, params: flatMap(node.params, getParamNames), anyUsed: false})
            }
        }

        function handleExitFunctionExpression(node) {
            const state = last(callStack)
            if (state && state.func === node) {
                callStack.pop()
                if (!state.anyUsed) {
                    context.report(node.parent, 'Prefer _.times over _.map without using arguments')
                }
            }
        }

        const isIterateeParamDefinition = (state, node) => state && ((node.parent === state.func && includes(state.func.params, node)) ||
            (node.parent.type === 'AssignmentPattern' && node.parent.parent === state.func))

        return {
            FunctionExpression: handleFunctionExpression,
            ArrowFunctionExpression: handleFunctionExpression,
            Identifier(node) {
                if (!isIterateeParamDefinition(last(callStack), node)) {
                    const usageContext = findLast(callStack, state => includes(state.params, node.name))
                    set(usageContext, 'anyUsed', true)
                }
            },
            'FunctionExpression:exit': handleExitFunctionExpression,
            'ArrowFunctionExpression:exit': handleExitFunctionExpression
        }
    }
}
