'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../src/rules/prefer-invoke-map');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.invokeMap over map to a method call.'}];
ruleTester.run('prefer-invoke-map', rule, {
    valid: [
        'var x = _.invokeMap(arr, "f")',
        'var x = _.invokeMap(arr, "split", " ")'
    ],
    invalid: [{
        code: '_.map(a, function(x) {return x.f()});',
        errors: errors
    }, {
        code: '_(a).filter(f).map(function(x) { return x.split(" ")})',
        errors: errors
    }, {
        code: '_.map(arr, x => x.f())',
        parserOptions: {ecmaVersion: 6},
        errors: errors
    }]
});
