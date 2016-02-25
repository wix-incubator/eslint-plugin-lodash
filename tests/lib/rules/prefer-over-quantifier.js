'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-over-quantifier');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = {
    every: [{message: 'Prefer _.overEvery instead of a conjunction'}],
    some: [{message: 'Prefer _.overSome instead of a disjunction'}]
};
ruleTester.run('prefer-over-quantifier', rule, {
    valid: [
        'var t = _.filter(a, f)',
        'var t = _.filter(a, function(x) { return f(x)})',
        'var t = _.filter(a, function(x) { return f(x) && (g(x) || h(x))})',
        {code: 'var t = _.filter(a, x => x % 2)', parserOptions: {ecmaVersion: 6}},
        {code: 'var t = _.filter(a, x => f(x) && x % 2)', parserOptions: {ecmaVersion: 6}}
    ],
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
        parserOptions: {ecmaVersion: 6},
        errors: errors.every
    }, {
        code: 'var t = _.filter(a, x => f(x) || g(x) || h(x))',
        parserOptions: {ecmaVersion: 6},
        errors: errors.some
    }]
});
