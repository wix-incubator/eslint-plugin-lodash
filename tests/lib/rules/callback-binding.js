'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/callback-binding')
const ruleTesterUtils = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtils.getRuleTester()
const optionsUtil = require('../testUtil/optionsUtil')
ruleTester.run('callback-binding', rule, {
    valid: [
        'var x = _.map(arr, f)',
        'var r = _.find(themeStyleList, function (themeStyle) { return this.x; }, this);',
        'var r = _.find(arr, function (i) { return this.x; }.bind(this, x));',
        'var r = _.zipWith([1],[2],[3], f);'
    ].map(optionsUtil.fromVersion3).concat([
        'var x = _.map(arr, f.bind(this))',
        'var x = _.find(users, function(user) { return user.age > this.age}.bind(this));',
        'var t = _.isArray(x)',
        'var t = _.assign(a, b, c);',
        'var i = _.sortedIndex(arr, val, f);',
        'var i = _.sortedIndexBy(arr, val, obj)'
    ]),
    invalid: [
        'var r = _.find(users, function (user) { return user.age > this.age; }.bind(this));',
        'var r = _.find(users, predicate.bind(this));'
    ].map(optionsUtil.fromVersion3).map(optionsUtil.fromMessage('Unnecessary bind, pass `thisArg` to lodash method instead')).concat([
        'var t = _.find(users, function(user) { return this.x === user}, this);',
        'var t = _.reduce(users, func, initial, this);'
    ].map(optionsUtil.fromMessage('Do not use Lodash 3 thisArg, use binding instead')))
})
