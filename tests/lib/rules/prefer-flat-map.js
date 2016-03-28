'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-flat-map')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Prefer _.flatMap over consecutive map and flatten.'}]
ruleTester.run('prefer-flat-map', rule, {
    valid: [
        't = _.map(a, f);',
        't = _.flatMap(a, f);'
    ],
    invalid: [{
        code: '_(a).map(f).flatten().value',
        errors    }, {
        code: 't = _.flatten(_.map(a, f));',
        errors    }]
})
