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
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.isMatch over conditions on the same object')
ruleTester.run('prefer-matches', rule, {
    valid: [
        'foo = bar.a === 1 && bar.b == 2',
        'foo = _.matches(bar, {a: 1 ,b: 2})'
    ].map(withDefaultPragma),
    invalid: [
        'x = a.foo === 1 && a.bar === 2 && a.baz === 3',
        'x = a["foo"] === 1 && a["bar"] === 2 && a.baz === 3',
        {
            code: 'x = a.foo === 1 && a.bar === 2',
            options: [2]
        }].map(toErrorObject).map(withDefaultPragma)
})
