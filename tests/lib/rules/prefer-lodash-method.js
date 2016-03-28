'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-lodash-method')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('prefer-lodash-method', rule, {
    valid: [
        'var x = _.map(arr, f)',
        'var x = _(arr).map(f).reduce(g)',
        'var x = _.chain(arr).map(f).reduce(g).value()',
        'var x = _.keys(obj)',
        'var x = arr.indexOf(item)',
        {
            code: 'var x = a.map(f)',
            options: [{except: ['map']}]
        }
    ],
    invalid: [{
        code: 'var x = a.map(function(x) {return x.f()});',
        errors: [{message: 'Prefer \'_.map\' over the native function.'}]
    }, {
        code: 'var x = arr.filter(x => x.f())',
        parserOptions: {ecmaVersion: 6},
        errors: [{message: 'Prefer \'_.filter\' over the native function.'}]
    }, {
        code: 'var x = Object.keys(node)',
        errors: [{message: "Prefer '_.keys' over the native function."}]
    }]
})
