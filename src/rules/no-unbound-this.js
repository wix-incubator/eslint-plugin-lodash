/**
 * @fileoverview Rule to check that all uses of `this` inside collection methods are bound
 */
'use strict'
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    create(context) {
        const {getLodashMethodCallExpVisitor, getLodashContext} = require('../util/lodashUtil')
        const {getCollectionMethods} = require('../util/methodDataUtil')
        const {isFunctionExpression} = require('../util/astUtil')
        const assign = require('lodash/assign')
        let collectionMethods
        const funcInfos = new Map()
        let currFuncInfo = {
            thisUses: []
        }
        const lodashContext = getLodashContext(context)
        return assign({
            'CallExpression:exit': getLodashMethodCallExpVisitor(lodashContext, (node, iteratee, {method, version}) => {
                collectionMethods = collectionMethods || new Set(getCollectionMethods(version).concat(['forEach', 'forEachRight']))
                if (collectionMethods.has(method) && funcInfos.has(iteratee)) {
                    const {thisUses} = funcInfos.get(iteratee)
                    if (isFunctionExpression(iteratee) && thisUses.length) {
                        thisUses.forEach(thisNode => {context.report(thisNode, 'Do not use `this` without binding in collection methods')})
                    }
                }
            }),
            ThisExpression(node) {
                currFuncInfo.thisUses.push(node)
            },
            onCodePathStart(codePath, node) {
                currFuncInfo = {
                    upper: currFuncInfo,
                    codePath,
                    thisUses: []
                }
                funcInfos.set(node, currFuncInfo)
            },
            onCodePathEnd() {
                currFuncInfo = currFuncInfo.upper
            }
        }, lodashContext.getImportVisitors())
    }
}
