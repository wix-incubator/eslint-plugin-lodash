'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-over-quantifier')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const errors = {
    every: [{message: 'Prefer _.overEvery instead of a conjunction'}],
    some: [{message: 'Prefer _.overSome instead of a disjunction'}]
}
const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('prefer-over-quantifier', rule, {
    valid: [
        'var t = _.filter(a, f)',
        'var t = _.filter(a, function(x) { return f(x)})',
        'var t = _.filter(a, function(x) { return f(x) && (g(x) || h(x))})',
        'var t = _.filter(a, x => x % 2)',
        'var t = _.filter(a, x => f(x) && x % 2)'
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var t = _.filter(a, function(x) { return f(x) && g(x); })',
        errors: errors.every
    }, {
        code: 'var t = _(arr).map("subObject").filter(function(x) { return f(x) || g(x); }).value();',
        errors: errors.some
    }, {
        code: 'var t = _(arr).map("subObject").filter(function(x) { return f(x) || g(x) || h(x); }).value();',
        errors: errors.some
    }, {
        code: 'var t = _(arr).filter(f).filter(g).value();',
        errors: errors.every
    }, {
        code: 'var t = _(arr).map("subObject").filter(x => f(x) && g(x) && h(x)).value();',
        errors: errors.every
    }, {
        code: 'var t = _.filter(a, x => f(x) || g(x) || h(x))',
        errors: errors.some
    }].map(withDefaultPragma).concat([{
        code: 'import f from "lodash/filter"; var t = f(a, x => g(x) || h(x))',
        errors: errors.some,
        parserOptions: {
            sourceType: 'module'
        }
    }])
})
