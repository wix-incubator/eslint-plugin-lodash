'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../src/rules/prefer-compact');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = {message: 'Prefer _.compact over filtering of Boolean casting'};
ruleTester.run('prefer-compact', rule, {
    valid: [
        'var x = _.filter(arr, function(x) {return f(x) || g(x)})',
        'var x = _.filter(arr, function(x) {var a = 1; return f(x, a);})'
    ],
    invalid: [{
        code: '_(arr).map(f).filter(function(x) {return x})',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, Boolean)',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, function(x) { return !!x})',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, function(x) {return Boolean(x) })',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, x => !!x)',
        parserOptions: {ecmaVersion: 6},
        errors: [ruleError]
    }]
});
