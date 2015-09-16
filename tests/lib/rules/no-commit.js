'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-commit');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Do not end chain with commit, except for side effects.'}];
ruleTester.run('prefer-map', rule, {
    valid: [{
        code: 'var x = _(a).map(f).value();'
    }, {
        code: '_(a).filter(f).forEach(g).value()'
    }, {
        code: '_(a).filter(f).forEach(g).commit()'
    }],
    invalid: [{
        code: '_(arr).map(f).commit();',
        errors: errors
    }]
});
