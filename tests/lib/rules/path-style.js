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
        "var aProp = _.property('a');",
        "var aProp = _.property('a.b');",
        'var aProp = _.property(`${name}id`);',
        "var aProp = _.property(name + 'id');",
        "var aProp = _.property(['a', 'b', x]);",
        {code: "var t = _.get(x, ['a'])", options: ['array']},
        {code: 'var t = _.has(x, `a.b.${x}`)', options: ['string']},
        {code: "var t = _.has(x, 'a.b.' + x)", options: ['string']},
        {code: "_.set(x, ['a'], t)", options: ['array']},
        "var t = _.replace(a, 'a', 'b')"
    ].map(withDefaultPragma),
    invalid: [{
        code: "_.invoke(x, ['a'])",
        errors: [{message: 'Use a string for simple paths'}]
    }, {
        code: "_(x).invoke(['a']).filter(f).value()",
        errors: [{message: 'Use a string for simple paths'}]
    }, {
        code: "var t = _.matchesProperty(['a', 'b'])",
        errors: [{message: 'Use a string for simple paths'}]
    }, {
        code: "var t = _.has(y, 'a.' + x)",
        errors: [{message: 'Use an array for paths with variables'}]
    }, {
        code: "var t = _.has(y, x + '[b]')",
        errors: [{message: 'Use an array for paths with variables'}]
    }, {
        code: 'var t = _.has(y, `a[${x}]`)',
        errors: [{message: 'Use an array for paths with variables'}]
    }, {
        code: "var t = _.get(x, 'a');",
        errors: [{message: 'Use an array for paths', column: 18}],
        options: ['array']
    }, {
        code: "var t = _.get(x, ['a', 'b']);",
        errors: [{message: 'Use a string for paths', column: 18}],
        options: ['string']
    }].map(withDefaultPragma)
})
