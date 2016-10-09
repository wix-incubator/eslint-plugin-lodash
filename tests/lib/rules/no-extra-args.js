'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-extra-args')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')
const {withDefaultPragma}= require('../testUtil/optionsUtil')
// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
ruleTester.run('no-extra-args', rule, {
    valid: [
        'obj.constant(foo => _(foo).reduce(bar, []));',
        'var x = _.uniq(arr);',
        'var x = _.assign(a, b, c, d, e);'
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var x = _.uniq(arr, "prop");',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 1).'}]
    }, {
        code: 'var x = _(arr).filter(f).uniq(arr, "prop").value();',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 0).'}]
    }].map(withDefaultPragma).concat([{
        code: 'import uniq from "lodash/uniq"; var x = uniq(arr, "prop")',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 1).'}],
        parserOptions: {
            sourceType: 'module'
        }
    }])
})
