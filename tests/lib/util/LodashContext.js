'use strict'
const traverser = require('eslint-traverser')
const LodashContext = require('../../../src/util/LodashContext')
const assert = require('assert')
describe('LodashContext', () => {
    describe('getLodashImportVisitors', () => {
        describe('ImportDeclaration', () => {
            it('should accept a namespace import as lodash', done => {
                traverser('import * as lodash from "lodash"; lodash.map(arr, x => x)', {sourceType: 'module'})
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            assert(lodashContext.general[node.callee.object.name])
                            done()
                        }
                        return visitors
                    })
            })
            it('should accept a destructured import as lodash', done => {
                traverser('import {map} from "lodash"; map(arr, x => x)', {sourceType: 'module'})
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            assert(lodashContext.methods[node.callee.name] === 'map')
                            done()
                        }
                        return visitors
                    })
            })
            it('should not throw error when trying to import lodash for side effects', () => {
                traverser('import "lodash"', {sourceType: 'module'})
                    .runRuleCode(context => (new LodashContext(context)).getImportVisitors())
            })
            it('should not collect anything from arbitrary imports', done => {
                traverser('import map from "some-other-map"; map(arr, x => x)', {sourceType: 'module'})
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            assert(!lodashContext.methods[node.callee.name])
                            done()
                        }
                        return visitors
                    })
            })
        })
        describe('VariableDeclarator', () => {
            it('should accept a require of the entire lodash library', done => {
                traverser('const _ = require("lodash"); _.map(arr, x => x)')
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            if (node.callee.property && node.callee.property.name === 'map') {
                                assert(lodashContext.general[node.callee.object.name])
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should accept a destructured require of the main module', done => {
                traverser('const {map} = require("lodash"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                // assert(lodashUtil.isCallToLodashMethod(node, 'map', context))
                                assert(lodashContext.methods[node.callee.name] === 'map')
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should accept a single method require', done => {
                traverser('const map = require("lodash/map"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(lodashContext.methods[node.callee.name] === 'map')
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should not collect arbitrary requires', done => {
                traverser('const map = require("some-other-map"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(lodashContext.methods[node.callee.name] !== 'map')
                                done()
                            }
                        }
                        return visitors
                    })
            })
            it('should not collect anything from array patterns required from lodash', done => {
                traverser('const [map] = require("lodash"); map(arr, x => x)')
                    .runRuleCode(context => {
                        const lodashContext = new LodashContext(context)
                        const visitors = lodashContext.getImportVisitors()
                        visitors.CallExpression = node => {
                            if (node.callee.name === 'map') {
                                assert(lodashContext.methods[node.callee.name] !== 'map')
                                done()
                            }
                        }
                        return visitors
                    })
            })
        })
    })
    describe('isImportedLodash', () => {
        it('should return true for a lodash that was imported', done => {
            traverser('import * as lodash from "lodash"; lodash.map(arr, x => x)', {sourceType: 'module'})
                .runRuleCode(context => {
                    const lodashContext = new LodashContext(context)
                    const visitors = lodashContext.getImportVisitors()
                    visitors.CallExpression = node => {
                        assert(lodashContext.isImportedLodash(node.callee.object))
                        done()
                    }
                    return visitors
                })
        })
        it('should return false for other identifiers', done => {
            traverser('const one = 1')
                .runRuleCode(context => {
                    const lodashContext = new LodashContext(context)
                    const visitors = lodashContext.getImportVisitors()
                    visitors.Identifier = node => {
                        assert(!lodashContext.isImportedLodash(node))
                        done()
                    }
                    return visitors
                })
        })
    })
    describe('getImportedLodashMethod', () => {
        it('should return the imported Lodash method when called as a single method', done => {
            traverser('import map from "lodash/map"; map(arr, x => x)', {sourceType: 'module'})
                .runRuleCode(context => {
                    const lodashContext = new LodashContext(context)
                    const visitors = lodashContext.getImportVisitors()
                    visitors.CallExpression = node => {
                        assert(lodashContext.getImportedLodashMethod(node) === 'map')
                        done()
                    }
                    return visitors
                })
        })
        it('should return undefined for other function calls', done => {
            traverser('const one = f()')
                .runRuleCode(context => {
                    const lodashContext = new LodashContext(context)
                    const visitors = lodashContext.getImportVisitors()
                    visitors.CallExpression = node => {
                        assert(lodashContext.getImportedLodashMethod(node) === undefined)
                        done()
                    }
                    return visitors
                })
        })
        it('should return undefined for other node types', done => {
            traverser('const one = 1')
                .runRuleCode(context => {
                    const lodashContext = new LodashContext(context)
                    const visitors = lodashContext.getImportVisitors()
                    visitors.Identifier = node => {
                        assert(lodashContext.getImportedLodashMethod(node) === undefined)
                        done()
                    }
                    return visitors
                })
        })
    })

})