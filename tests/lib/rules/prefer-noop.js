'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-noop')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Prefer _.noop over an empty function'}]
ruleTester.run('prefer-noop', rule, {
    valid: [
        'x = function() { return 2}',
        'x = function(x) {return x}',
        {code: 'x = a => a.b', parserOptions: {ecmaVersion: 6}},
        {code: 'class A { m() {}}', parserOptions: {ecmaVersion: 6}}
    ],
    invalid: [{
        code: 'functionWithCb(function() {})',
        errors    }, {
        code: 'x = function(){/* */}',
        errors    }, {
        code: 'CallCb(()=> {})',
        parserOptions: {ecmaVersion: 6},
        errors    }]
})
