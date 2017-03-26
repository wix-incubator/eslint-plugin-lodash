'use strict'
const assert = require('assert')
const v4 = require('../../../src/util/methodDataByVersion/4')
const _ = require('lodash')
describe('methodData', () => {
    it('should have an entry for every item', () => {
        const functions = _.keys(_.pickBy(_, m => _.isFunction(m) && m !== _))
        for (const f of functions) {
            assert(v4[f] || _.some(v4, ({aliases}) => _.includes(aliases, f)), `${f} has no entry`)
        }
        const wrapper = _()
        const wrapperFunctions = _.keys(_.pickBy(wrapper, _.isFunction))
        for (const f of wrapperFunctions) {
            assert(v4[f] || _.some(v4, ({aliases}) => _.includes(aliases, f)), `wrapper method ${f} has no entry`)
        }
    })
})