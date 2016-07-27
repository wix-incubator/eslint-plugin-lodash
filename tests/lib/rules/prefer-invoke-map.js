'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-invoke-map')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const errors = [{message: 'Prefer _.invokeMap over map to a method call.'}]
ruleTester.run('prefer-invoke-map', rule, {
    valid: [
        'var x = _.invokeMap(arr, "f")',
        'var x = _.invokeMap(arr, "split", " ")',
        'const x = _.map(arr, ({a}) => f(a))'
    ],
    invalid: [{
        code: '_.map(a, function(x) {return x.f()});',
        errors
    }, {
        code: '_(a).filter(f).map(function(x) { return x.split(" ")})',
        errors
    }, {
        code: '_.map(arr, x => x.f())',
        errors
    }]
})
