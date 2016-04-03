'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/collection-method-value')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const fromMessage = require('../testUtil/optionsUtil').fromMessage
ruleTester.run('collection-method-value', rule, {
    valid: [
        'x = _.map(arr, f)',
        '_.forEach(arr, g)',
        'if (_.some(arr, h)) {i()}',
        'x = _(arr).filter(p).map(q).value()',
        '_(arr).filter(p).forEach(g)'
    ],
    invalid: [
        'x = _.forEach(arr, g)',
        'x = _(arr).map(f).forEach(g)',
        'x = _.chain(arr).map(f).forEach(g).value()'
    ].map(fromMessage('Do not use value returned from _.forEach')).concat([
        '_.map(arr, f)',
        '_(arr).filter(g).map(f).value()',
        '_.chain(arr).find(p).map(f).value()'
    ].map(fromMessage('Use value returned from _.map')))
})
