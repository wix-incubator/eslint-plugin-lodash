'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-reject');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = {message: 'Prefer _.reject over negative condition'};
ruleTester.run('prefer-reject', rule, {
    valid: [{
        code: 'var x = _.filter(arr, function(x) {return !x.a && p})'
    }],
    invalid: [{
        code: '_(arr).map(f).filter(function(x) {return !x.isSomething})',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, function(x) { return x.a !== b})',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, function(x) { return b !== x.a})',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, function(x) {return !x.isSomething})',
        errors: [ruleError]
    }, {
        code: '_.filter(arr, x => !x.isSomething)',
        ecmaFeatures: {arrowFunctions: true},
        errors: [ruleError]
    }]
});
