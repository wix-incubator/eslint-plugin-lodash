'use strict'
const assert = require('assert')
const v4 = require('../../../src/util/methodDataByVersion/4')
const _ = require('lodash')
describe('methodData', () => {
    it('should have an entry for every item on Lodash', () => {
        const functions = _.keys(_.pickBy(_, m => _.isFunction(m) && m !== _))
        const methodsNotCovered = _(functions).difference(_.keys(v4)).reject(f => _.some(v4, ({aliases}) => _.includes(aliases, f))).value()
        assert.equal(methodsNotCovered.length, 0, `there are no entries for methods ${methodsNotCovered}`)
    })
    it('should have an entry for every item on the wrapper object', () => {
        const wrapper = _()
        const wrapperFunctions = _.keys(_.pickBy(wrapper, _.isFunction))
        const methodsNotCovered = _(wrapperFunctions).difference(_.keys(v4)).reject(f => _.some(v4, ({aliases}) => _.includes(aliases, f))).value()
        assert.deepEqual(methodsNotCovered.length, 0, `there are no entries for wrapper methods ${methodsNotCovered}`)
    })
})