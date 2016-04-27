'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-constant')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const errors = [{message: 'Prefer _.constant over a function returning a literal'}]
ruleTester.run('prefer-constant', rule, {
    valid: [
        'var x = function() { return f();}',
        'var x = function() {return [y]}',
        'var x = function() {return {a: y}}',
        'var x = function() {return y ? 1 : 2}',
        'var x = function() {return true ? 1 : x}',
        'var x = function() { return {[y]: 1}}',
        {code: 'var x = () => 1', options: [false]},
        'function one() { return 1; }'
    ],
    invalid: [{
        code: 'var x = function() { return 1; }',
        errors
    }, {
        code: 'var x = function() { return 1 + 1; }',
        errors
    }, {
        code: 'var x = function() { return typeof 1; }',
        errors
    }, {
        code: 'var x = () => 1',
        options: [true],
        errors
    }, {
        code: 'function one() { return 1; }',
        options: [true, true],
        errors
    }]
})
