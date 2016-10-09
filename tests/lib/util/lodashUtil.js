'use strict'
const traverser = require('eslint-traverser')
const lodashUtil = require('../../../src/util/lodashUtil')
const assert = require('assert')
describe('lodashUtil', () => {
    describe('getLodashImportVisitors', () => {
        describe('ImportDeclaration', () => {
            it('should accept a namespace import as lodash', done => {
                traverser('import * as lodash from "lodash"; lodash.map(arr, x => x)', {sourceType: 'module'})
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            assert(lodashUtil.isCallToLodashMethod(node, 'map', context))
                            done()
                        }
                        return visitors
                    })
            })
            it('should accept a destructured import as lodash', done => {
                traverser('import {map} from "lodash"; map(arr, x => x)', {sourceType: 'module'})
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            assert(lodashUtil.isCallToLodashMethod(node, 'map', context))
                            done()
                        }
                        return visitors
                    })
            })
            it('should not throw error when trying to import lodash for side effects', () => {
                traverser('import "lodash"', {sourceType: 'module'})
                    .runRuleCode(context => lodashUtil.getLodashImportVisitors(context))
            })
            it('should not collect anything from arbitrary imports', done => {
                traverser('import map from "some-other-map"; map(arr, x => x)', {sourceType: 'module'})
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(!lodashUtil.isCallToLodashMethod(node, 'map', context))
                                done()
                            }
                        }
                        return visitors
                    })
            })
        })
        describe('VariableDeclarator', () => {
            it('should accept a require of the entire lodash library', done => {
                traverser('const _ = require("lodash"); _.map(arr, x => x)')
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            if (node.callee.property && node.callee.property.name === 'map') {
                                assert(lodashUtil.isCallToLodashMethod(node, 'map', context))
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should accept a destructured require of the main module', done => {
                traverser('const {map} = require("lodash"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(lodashUtil.isCallToLodashMethod(node, 'map', context))
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should accept a single method require', done => {
                traverser('const map = require("lodash/map"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(lodashUtil.isCallToLodashMethod(node, 'map', context))
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should not collect arbitrary requires', done => {
                traverser('const map = require("some-other-map"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(!lodashUtil.isCallToLodashMethod(node, 'map', context))
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should not collect anything from array patterns required from lodash', done => {
                traverser('const [map] = require("lodash"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const visitors = lodashUtil.getLodashImportVisitors(context)
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(!lodashUtil.isCallToLodashMethod(node, 'map', context))
                                done()
                            }
                        }
                        return visitors
                    })
            })
        })
    })
})