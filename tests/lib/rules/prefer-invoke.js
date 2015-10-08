'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-invoke');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.invoke over map to a method call.'}];
ruleTester.run('prefer-invoke', rule, {
    valid: [
        'var x = _.invoke(arr, "f")',
        'var x = _.invoke(arr, "split", " ")'
    ],
    invalid: [{
        code: '_.map(a, function(x) {return x.f()});',
        errors: errors
    }, {
        code: '_(a).filter(f).map(function(x) { return x.split(" ")})',
        errors: errors
    }, {
        code: '_.map(arr, x => x.f())',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }]
});
