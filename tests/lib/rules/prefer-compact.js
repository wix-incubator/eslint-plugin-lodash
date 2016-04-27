'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-compact')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const toErrorObject = require('../testUtil/optionsUtil').fromMessage('Prefer _.compact over filtering of Boolean casting')
ruleTester.run('prefer-compact', rule, {
    valid: [
        'var x = _.filter(arr, function(x) {return f(x) || g(x)})',
        'var x = _.filter(arr, function(x) {var a = 1; return f(x, a);})'
    ],
    invalid: [
        '_(arr).map(f).filter(function(x) {return x})',
        '_.filter(arr, Boolean)',
        '_.filter(arr, function(x) { return !!x})',
        '_.filter(arr, function(x) {return Boolean(x) })',
        '_.filter(arr, x => !!x)'
    ].map(toErrorObject)
})
