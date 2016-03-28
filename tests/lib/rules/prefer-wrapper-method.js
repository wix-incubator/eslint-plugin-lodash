'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-wrapper-method')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Prefer split with wrapper method over inside the chain start.'}]
ruleTester.run('prefer-wrapper-method', rule, {
    valid: [
        'var x = _(str).split(c).map(f).reduce(g)'
    ],
    invalid: [{
        code: '_(str.split(c)).map(f).reduce(g)',
        errors
    }, {
        code: '_.chain(str.split(c)).map(f).reduce(g).value()',
        errors
    }]
})
