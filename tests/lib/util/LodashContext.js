'use strict'
const assign = require('lodash/assign')
const traverser = require('eslint-traverser')
const LodashContext = require('../../../src/util/LodashContext')
const assert = require('assert')
const defaultPragmaConfig = {settings: {lodash: {pragma: '_'}}}

function visitWithContext(code, config, getVisitorsByLodashContext) {
    traverser(code, config)
        .runRuleCode(context => {
            const lodashContext = new LodashContext(context)
            const importVisitors = lodashContext.getImportVisitors()
            return assign(importVisitors, getVisitorsByLodashContext(lodashContext))
        })
}

describe('LodashContext', () => {
    describe('getImportVisitors', () => {
        describe('ImportDeclaration', () => {
            it('should accept a namespace import as lodash', done => {
                visitWithContext('import * as lodash from "lodash"; lodash.map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.general[node.callee.object.name])
                        done()
                    }
                }))
            })
            it('should accept a default import as lodash', done => {
                visitWithContext('import lodash from "lodash"; lodash.map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.general[node.callee.object.name])
                        done()
                    }
                }))
            })
            it('should accept a default lodash-es import as lodash', done => {
                visitWithContext('import * as lodash from "lodash-es"; lodash.map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.general[node.callee.object.name])
                        done()
                    }
                }))
            })
            it('should accept a destructured import as lodash', done => {
                visitWithContext('import {map} from "lodash"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.methods[node.callee.name] === 'map')
                        done()
                    }
                }))
            })
            it('should accept a single method import as lodash', done => {
                visitWithContext('import map from "lodash/map"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.methods[node.callee.name] === 'map')
                        done()
                    }
                }))
            })
            it('should accept a single method import from lodash-es as lodash', done => {
                visitWithContext('import map from "lodash-es/map"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.methods[node.callee.name] === 'map')
                        done()
                    }
                }))
            })
            it('should accept a single method package import as lodash', done => {
                visitWithContext('import map from "lodash.map"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(lodashContext.methods[node.callee.name] === 'map')
                        done()
                    }
                }))
            })
            it('should not accept a single method packge import from lodash-es as lodash', done => {
                visitWithContext('import map from "lodash-es.map"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(!lodashContext.methods[node.callee.name])
                        done()
                    }
                }))
            })
            it('should not throw error when trying to import lodash for side effects', () => {
                traverser('import "lodash"', {sourceType: 'module'})
                    .runRuleCode(context => (new LodashContext(context)).getImportVisitors())
            })
            it('should not collect anything from arbitrary imports', done => {
                visitWithContext('import map from "some-other-map"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                    CallExpression(node) {
                        assert(!lodashContext.methods[node.callee.name])
                        done()
                    }
                }))
            })
        })
        describe('VariableDeclarator', () => {
            it('should accept a require of the entire lodash library', done => {
                visitWithContext('const _ = require("lodash"); _.map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.property && node.callee.property.name === 'map') {
                            assert(lodashContext.general[node.callee.object.name])
                            done()
                        }
                    }
                }))
            })
            it('should accept a require of the entire lodash-es library', done => {
                visitWithContext('const _ = require("lodash-es"); _.map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.property && node.callee.property.name === 'map') {
                            assert(lodashContext.general[node.callee.object.name])
                            done()
                        }
                    }
                }))
            })
            it('should accept a destructured require of the main module', done => {
                visitWithContext('const {map} = require("lodash"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] === 'map')
                            done()
                        }
                    }
                }))
            })
            it('should accept a destructured require of the main lodash-es module', done => {
                visitWithContext('const {map} = require("lodash-es"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] === 'map')
                            done()
                        }
                    }
                }))
            })
            it('should accept a single method require', done => {
                visitWithContext('const map = require("lodash/map"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] === 'map')
                            done()
                        }
                    }
                }))
            })
            it('should accept a single method require from lodash-es', done => {
                visitWithContext('const map = require("lodash-es/map"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] === 'map')
                            done()
                        }
                    }
                }))
            })
            it('should accept a single method package require', done => {
                visitWithContext('const map = require("lodash.map"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] === 'map')
                            done()
                        }
                    }
                }))
            })
            it('should not accept a single method package require from lodash-es', done => {
                visitWithContext('const map = require("lodash-es.map"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(!lodashContext.methods[node.callee.name])
                            done()
                        }
                    }
                }))
            })
            it('should not collect arbitrary requires', done => {
                visitWithContext('const map = require("some-other-map"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] !== 'map')
                            done()
                        }
                    }
                }))
            })
            it('should not collect anything from array patterns required from lodash', done => {
                visitWithContext('const [map] = require("lodash"); map(arr, x => x)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'map') {
                            assert(lodashContext.methods[node.callee.name] !== 'map')
                            done()
                        }
                    }
                }))
            })
            it('should not consider Object.prototype methods as Lodash', done => {
                visitWithContext('const {toString} = require("lodash/fp"); const x = toString(y)', undefined, lodashContext => ({
                    CallExpression(node) {
                        if (node.callee.name === 'toString') {
                            assert(!lodashContext.isLodashChainStart(node))
                            done()
                        }
                    }
                }))
            })
        })
    })
    describe('isImportedLodash', () => {
        it('should return true for a lodash that was imported', done => {
            visitWithContext('import * as lodash from "lodash"; lodash.map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isImportedLodash(node.callee.object))
                    done()
                }
            }))
        })
        it('should return false for other identifiers', done => {
            visitWithContext('const one = 1', undefined, lodashContext => ({
                Identifier(node) {
                    assert(!lodashContext.isImportedLodash(node))
                    done()
                }
            }))
        })
    })
    describe('getImportedLodashMethod', () => {
        it('should return the imported Lodash method when called as a single method', done => {
            visitWithContext('import map from "lodash/map"; map(arr, x => x)', {sourceType: 'module'}, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.getImportedLodashMethod(node) === 'map')
                    done()
                }
            }))
        })
        it('should return undefined for other function calls', done => {
            visitWithContext('const one = f()', undefined, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.getImportedLodashMethod(node) === undefined)
                    done()
                }
            }))
        })
        it('should return undefined for other node types', done => {
            visitWithContext('const one = 1', undefined, lodashContext => ({
                Identifier(node) {
                    assert(lodashContext.getImportedLodashMethod(node) === undefined)
                    done()
                }
            }))
        })
    })
    describe('isLodashCall', () => {
        it('should return true if pragma is defined and it is a call from it', done => {
            visitWithContext('const ids = _.map(users, "id")', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isLodashCall(node))
                    done()
                }
            }))
        })
        it('should return true if no pragma is defined and the call is an imported lodash', done => {
            visitWithContext('import _ from "lodash"; const ids = _.map(users, "id")', {sourceType: 'module'}, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isLodashCall(node))
                    done()
                }
            }))
        })
        it('should return a falsy value if the call is a single method import', done => {
            visitWithContext('import map from "lodash/map"; const ids = map(users, "id")', {sourceType: 'module'}, lodashContext => ({
                CallExpression(node) {
                    assert(!lodashContext.isLodashCall(node))
                    done()
                }
            }))
        })
    })
    describe('isImplicitChainStart', () => {
        it('should return true if the callExp is an implicit chain start', done => {
            visitWithContext('const wrapper = _(val)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isImplicitChainStart(node))
                    done()
                }
            }))
        })
        it('should return false if the callExp is an explicit chain start', done => {
            visitWithContext('const wrapper = _.chain(val)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(!lodashContext.isImplicitChainStart(node))
                    done()
                }
            }))
        })
        it('should return false for any other lodash call', done => {
            visitWithContext('const wrapper = _.map(val, f)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(!lodashContext.isImplicitChainStart(node))
                    done()
                }
            }))
        })
    })
    describe('isExplicitChainStart', () => {
        it('should return false if the callExp is an implicit chain start', done => {
            visitWithContext('const wrapper = _(val)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(!lodashContext.isExplicitChainStart(node))
                    done()
                }
            }))
        })
        it('should return true if the callExp is an explicit chain start', done => {
            visitWithContext('const wrapper = _.chain(val)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isExplicitChainStart(node))
                    done()
                }
            }))
        })
        it('should return false for any other lodash call', done => {
            visitWithContext('const wrapper = _.map(val, f)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(!lodashContext.isExplicitChainStart(node))
                    done()
                }
            }))
        })
    })
    describe('isLodashChainStart', () => {
        it('should return true if the callExp is an implicit chain start', done => {
            visitWithContext('const wrapper = _(val)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isLodashChainStart(node))
                    done()
                }
            }))
        })
        it('should return true if the callExp is an explicit chain start', done => {
            visitWithContext('const wrapper = _.chain(val)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(lodashContext.isLodashChainStart(node))
                    done()
                }
            }))
        })
        it('should return false for any other lodash call', done => {
            visitWithContext('const wrapper = _.map(val, f)', defaultPragmaConfig, lodashContext => ({
                CallExpression(node) {
                    assert(!lodashContext.isLodashChainStart(node))
                    done()
                }
            }))
        })
    })
})
