'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/collection-return')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('collection-return', rule, {
    valid: [
        '_.forEach(arr, function(a) { console.log(a)})',
        '_.map(arr, function(a) { return a*a})',
        {
            parserOptions: {ecmaVersion: 6},
            code: '_.map(arr, a => a + 1)'
        },
        '_.map(arr, function(a) {return a.some(function(x) {})})',
        '_(a).transform(function(acc, item) {acc[item] = f(item);}, {}).mapValues(g).value()',
        'function x(a) {return a;}',
        {
            code: 'y = _.reject(x, p => p); _.forEach(t, s => {}).value();',
            parserOptions: {ecmaVersion: 6}
        }
    ],
    invalid: [{
        code: '_.map(arr, function(a) {console.log(a)})',
        errors: [{message: 'Do not use _.map without returning a value'}]
    }, {
        code: '_.every(arr, function(a){f(a)})',
        errors: [{message: 'Do not use _.every without returning a value'}]
    }, {
        code: '_.map(arr, function(a){ a.every(function(b) {return b})})',
        errors: [{message: 'Do not use _.map without returning a value'}]
    }, {
        code: '_.reduce(arr, a => {f(a)})',
        errors: [{message: 'Do not use _.reduce without returning a value'}],
        parserOptions: {ecmaVersion: 6}
    }, {
        code: '_.map(arr, function x(a) {arr2.push(a)})',
        errors: [{message: 'Do not use _.map without returning a value'}]
    }]
})
