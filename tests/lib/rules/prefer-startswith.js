'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-startswith')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const toErrorObject = require('../testUtil/optionsUtil')
    .fromMessage('Prefer _.startsWith instead of comparing indexOf() to 0')

ruleTester.run('prefer-startswith', rule, {
    valid: [
        'a.indexOf(b) == 10',
        'a.indexOf(b) === 10',
        'a.indexOf(b) === -1',
        'a.indexOf(b) !== 10',
        'a.indexOf(b) != 10',
        'a.indexOf(b) > 0'
    ],
    invalid: [
        'var x = a.indexOf(b) == 0',
        'var x = a.indexOf(b) === 0',
        'var x = 0 !== a.indexOf(b)',
        'if(a.indexOf(b) != 0) {}'
    ].map(toErrorObject)
})
