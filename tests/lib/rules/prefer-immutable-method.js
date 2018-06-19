'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-immutable-method')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('prefer-immutable-method', rule, {
    valid: [
        'const x = _.without(arr, 1)'
    ].map(withDefaultPragma),
    invalid: [
        {
            code: 'const x = _.pullAll(arr, 1)',
            errors: [{
                message: 'Prefer _.difference instead of _.pullAll'
            }]
        }
    ].map(withDefaultPragma)
})
