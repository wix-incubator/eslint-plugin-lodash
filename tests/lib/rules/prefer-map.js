'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-map')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Prefer _.map over a _.forEach with a push to an array inside'}]
ruleTester.run('prefer-map', rule, {
    valid: [
        'var x = _.map(arr, function(x) {return x + 7})',
        '_.forEach(arr, function(x) { if (x.a) {a.push(x)}})',
        '_.forEach(arr, function (x){ a.push(x); if (f(x)) {a.push(b)}});'
    ],
    invalid: [{
        code: '_(arr).forEach(function(x) { a.push(x)})',
        errors
    }, {
        code: '_(arr).forEach(function(x) { a.push(f(x))})',
        errors
    }, {
        code: '_(arr).forEach(x => a.push(f(x)))',
        parserOptions: {ecmaVersion: 6},
        errors
    }]
})
