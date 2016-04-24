'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-constant')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Prefer _.constant over a function returning a literal'}]
ruleTester.run('prefer-constant', rule, {
    valid: [
        'var x = function() { return f();}',
        'var x = function() {return [y]}',
        'var x = function() {return {a: y}}',
        'var x = function() {return y ? 1 : 2}',
        'var x = function() {return true ? 1 : x}',
        {code: 'var x = function() { return {[y]: 1}}', parserOptions: {ecmaVersion: 6}},
        {code: 'var x = () => 1', parserOptions: {ecmaVersion: 6}, options: [false]},
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
        parserOptions: {ecmaVersion: 6},
        options: [true],
        errors
    }, {
        code: 'function one() { return 1; }',
        options: [true, true],
        errors
    }]
})
