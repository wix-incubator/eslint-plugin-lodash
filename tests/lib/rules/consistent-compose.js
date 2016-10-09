'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/consistent-compose')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('consistent-compose', rule, {
    valid: [
        'var f = _.flow(g, h);',
        'var x = _.map(a, f)'
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var f = _.flowRight(h, g)',
        errors: [{message: 'Use _.flow for composition'}]
    }, {
        code: 'var f = _.compose(h, g)',
        errors: [{message: 'Use _.flow for composition'}]
    }, {
        code: 'var f = _.flow(h, g)',
        errors: [{message: 'Use _.flowRight for composition'}],
        options: ['flowRight']
    }, {
        code: 'var f = _.compose(h, g)',
        errors: [{message: 'Use _.pipe for composition'}],
        options: ['pipe']
    }].map(withDefaultPragma)
})
