'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../src/rules/no-commit');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Do not end chain with commit.'}];
ruleTester.run('prefer-map', rule, {
    valid: [
        'var x = _(a).map(f).value();',
        '_(a).filter(f).forEach(g);'
    ],
    invalid: [{
        code: '_(arr).map(f).commit();',
        errors: errors
    }]
});
