'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-thru');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer using thru instead of function call in chain start.'}];
ruleTester.run('prefer-thru', rule, {
    valid: [{
        code: 'var x = _(str).thru(f).map(g).reduce(h);'
    }, {
        code: 'var x = _(f(a,b)).map(g).reduce(h);'
    }, {
        code: 'var x = _(f("img")).map(g).reduce(h);'
    }],
    invalid: [{
        code: '_(f(str)).map(g).reduce(h)',
        errors: errors
    }, {
        code: '_.chain(f(str.split(c))).map(h).reduce(g).value()',
        errors: errors
    }]
});
