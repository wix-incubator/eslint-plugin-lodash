'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-matches')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const errors = [{message: 'Prefer _.matches over conditions on the same object'}]
ruleTester.run('prefer-matches', rule, {
    valid: [
        'foo = bar.a === 1 && bar.b == 2',
        'foo = _.matches(bar, {a: 1 ,b: 2})'
    ],
    invalid: [{
        code: 'x = a.foo === 1 && a.bar === 2 && a.baz === 3',
        errors    }, {
        code: 'x = a["foo"] === 1 && a["bar"] === 2 && a.baz === 3',
        errors    }, {
        code: 'x = a.foo === 1 && a.bar === 2',
        errors,
        options: [2]
    }]
})
