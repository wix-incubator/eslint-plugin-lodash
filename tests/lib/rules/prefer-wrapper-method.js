'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-wrapper-method');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer split with wrapper method over inside the chain start.'}];
ruleTester.run('prefer-wrapper-method', rule, {
    valid: [{
        code: 'var x = _(str).split(c).map(f).reduce(g)'
    }],
    invalid: [{
        code: '_(str.split(c)).map(f).reduce(g)',
        errors: errors
    }, {
        code: '_.chain(str.split(c)).map(f).reduce(g).value()',
        errors: errors
    }]
});
