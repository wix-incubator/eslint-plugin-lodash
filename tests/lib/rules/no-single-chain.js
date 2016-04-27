'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-single-chain')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const toErrorObject = require('../testUtil/optionsUtil').fromMessage('Do not use chain syntax for single method')

ruleTester.run('no-single-chain', rule, {
    valid: [
        'var x = _.map(arr, f)',
        'var x = _(arr).map(f).filter(g).value()'
    ],
    invalid: [
        'var x = _(arr).map(f).value()',
        'var x = _(arr).reduce(f, i)'
    ].map(toErrorObject)
})
