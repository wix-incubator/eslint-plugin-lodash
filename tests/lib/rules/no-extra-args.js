'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-extra-args')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('no-extra-args', rule, {
    valid: [
        'var x = _.uniq(arr);',
        'var x = _.assign(a, b, c, d, e);'
    ],
    invalid: [{
        code: 'var x = _.uniq(arr, "prop");',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 1).'}]
    }, {
        code: 'var x = _(arr).filter(f).uniq(arr, "prop").value();',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 0).'}]
    }]
})
