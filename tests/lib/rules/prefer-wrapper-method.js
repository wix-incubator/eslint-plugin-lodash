'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-wrapper-method')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const toErrorObject = require('../testUtil/optionsUtil')
    .fromMessage('Prefer split with wrapper method over inside the chain start.')
ruleTester.run('prefer-wrapper-method', rule, {
    valid: [
        'var x = _(str).split(c).map(f).reduce(g)'
    ],
    invalid: ['_(str.split(c)).map(f).reduce(g)',
        '_.chain(str.split(c)).map(f).reduce(g).value()'
    ].map(toErrorObject)
})
