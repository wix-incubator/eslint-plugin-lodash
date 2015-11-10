'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-matches');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.matches over conditions on the same object'}];
ruleTester.run('prefer-matches', rule, {
    valid: [
        'foo = bar.a === 1 && bar.b == 2',
        'foo = _.matches(bar, {a: 1 ,b: 2})'
    ],
    invalid: [{
        code: 'x = a.foo === 1 && a.bar === 2 && a.baz === 3',
        errors: errors
    }, {
        code: 'x = a["foo"] === 1 && a["bar"] === 2 && a.baz === 3',
        errors: errors
    }, {
        code: 'x = a.foo === 1 && a.bar === 2',
        errors: errors,
        options: [2]
    }]
});
