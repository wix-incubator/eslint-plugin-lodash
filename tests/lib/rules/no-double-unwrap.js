'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-double-unwrap')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('no-double-unwrap', rule, {
    valid: [
        'var x = _(a).map(f).reduce(g)',
        'var x = _(a).map(f).value()',
        'var x = _.chain(a).reduce(f).value()',
        'var x = something.value()',
        '_(a).filter(f).forEach(g);'
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var x = _(a).some(f).value();',
        errors: [{message: 'Do not use .value() after chain-ending method some'}],
        output: 'var x = _(a).some(f);'
    }].map(withDefaultPragma)
})
