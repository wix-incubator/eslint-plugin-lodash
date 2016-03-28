'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-commit')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Do not end chain with commit.'}]
ruleTester.run('no-commit', rule, {
    valid: [
        'var x = _(a).map(f).value();',
        '_(a).filter(f).forEach(g);'
    ],
    invalid: [{
        code: '_(arr).map(f).commit();',
        errors
    }]
})
