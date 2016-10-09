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
const {withDefaultPragma, fromMessage} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.constant over a function returning a literal')
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
    ].map(withDefaultPragma),
    invalid: [
        'var x = function() { return 1; }',
        'var x = function() { return 1 + 1; }',
        'var x = function() { return typeof 1; }',
        {
            code: 'var x = () => 1',
            options: [true]
        }, {
            code: 'function one() { return 1; }',
            options: [true, true]
        }].map(withDefaultPragma).map(toErrorObject)
})
