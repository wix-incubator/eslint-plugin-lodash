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

const testCases = {
    valid: {
        v3Default: [
            'var x = _.map(arr, f)',
            'var r = _.find(themeStyleList, function (themeStyle) { return this.x; }, this);',
            'var r = _.find(arr, function (i) { return this.x; }.bind(this, x));',
            'var r = _.zipWith([1],[2],[3], f);'
        ].map(optionsUtil.fromVersion3WithDefaultPragma),
        v4Default: [
            'var x = _.map(arr, f.bind(this))',
            'var x = _.find(users, function(user) { return user.age > this.age}.bind(this));',
            'var t = _.isArray(x)',
            'var t = _.assign(a, b, c);',
            'var i = _.sortedIndex(arr, val, f);',
            'var i = _.sortedIndexBy(arr, val, obj)'
        ].map(optionsUtil.withDefaultPragma),
        v4: [
            'var map = ()=>{}; var x = map(arr, f.bind(this))'
        ]
    },
    invalid: {
        v3Default: [
            'var r = _.find(users, function (user) { return user.age > this.age; }.bind(this));',
            'var r = _.find(users, predicate.bind(this));'
        ].map(optionsUtil.fromVersion3WithDefaultPragma).map(optionsUtil.fromMessage('Unnecessary bind, pass `thisArg` to lodash method instead')),
        v4Default:[
            'var t = _.find(users, function(user) { return this.x === user}, this);',
            'var t = _.reduce(users, func, initial, this);'
        ].map(optionsUtil.withDefaultPragma).map(optionsUtil.fromMessage('Do not use Lodash 3 thisArg, use binding instead'))
    }
}

ruleTester.run('callback-binding', rule, {
    valid: [
        ...testCases.valid.v3Default,
        ...testCases.valid.v4Default,
        ...testCases.valid.v4
    ],
    invalid: [
        ...testCases.invalid.v3Default,
        ...testCases.invalid.v4Default
    ]
})
