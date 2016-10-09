'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/path-style')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('path-style', rule, {
    valid: [
        "var aProp = _.property('a')",
        {code: "var t = _.get(x, ['a', 'b'])", options: ['as-needed']},
        "var t = _.invoke(a, 'b');",
        {code: "var t = _.has(x, 'a.b')", options: ['string']},
        {code: "_.set(x, ['a'], t)", options: ['array']},
        "var t = _.replace(a, 'a', 'b')"
    ].map(withDefaultPragma),
    invalid: [{
        code: "var t = _.get(x, 'a.b');",
        errors: [{message: 'Use an array for deep paths', column: 18}],
        options: ['as-needed']
    }, {
        code: "var t = _.matchesProperty('a.b', val);",
        errors: [{message: 'Use an array for deep paths', column: 27}],
        options: ['as-needed']
    }, {
        code: "var t = _.has(x, ['a']);",
        errors: [{message: 'Use a string for single-level paths', column: 18}],
        options: ['as-needed']
    }, {
        code: "var t = _(x).assign(obj).get('a.b')",
        errors: [{message: 'Use an array for deep paths', column: 30}],
        options: ['as-needed']
    }, {
        code: "var t = _.get(x, 'a[0]');",
        errors: [{message: 'Use an array for deep paths', column: 18}],
        options: ['as-needed']
    }, {
        code: "var t = _.get(x, 'a');",
        errors: [{message: 'Use an array for paths', column: 18}],
        options: ['array']
    }, {
        code: "var t = _.get(x, ['a', 'b']);",
        errors: [{message: 'Use a string for paths', column: 18}],
        options: ['string']
    }].map(withDefaultPragma).concat([{
        code: 'import g from "lodash/get"; var t = g(x, "a")',
        errors: [{message: 'Use an array for paths'}],
        options: ['array'],
        parserOptions: {
            sourceType: 'module'
        }
    }
    ])
})
