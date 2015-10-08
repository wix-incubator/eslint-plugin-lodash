'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-get');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.get or _.has over an \'&&\' chain'}];
ruleTester.run('prefer-get', rule, {
    valid: [{
        code: 'var x = _.get(a, "b.c");'
    }, {
        code: 'var x = _.has(a, "b.c");'
    }, {
        code: 'var x = a && a.b'
    }, {
        code: 'a && a.b && f()'
    }],
    invalid: [{
        code: 'x = a && a.b && a.b.c === 8',
        errors: errors
    }, {
        code: 'x = a && a.b && a["b"].c && a.b.c.d',
        errors: errors
    }, {
        code: 'x = a && a.b',
        errors: errors,
        options: [2]
    }, {
        code: 'x = a && a.b && a.b.c && a.b.c.d',
        errors: errors,
        options: [2]
    }]
});
