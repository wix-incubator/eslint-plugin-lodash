'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-includes')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const toErrorMessage = require('../testUtil/optionsUtil').fromMessage('Prefer _.includes over indexOf comparison to -1')
ruleTester.run('prefer-includes', rule, {
    valid: [
        'if (_.includes(a, b)) {}',
        'x = _.indexOf(a, b) !== 2',
        'x = a.indexOf(b) === 2',
        {code: 'if (a.indexOf(b) !== -1) {}', options: [{includeNative: false}]}
    ],
    invalid: [
        'x = _.indexOf(a, b) === -1',
        'if (_.indexOf(a, b) !== -1) {}',
        {code: 'x = a.indexOf(b) !== -1', options: [{includeNative: true}]}
    ].map(toErrorMessage)
})
