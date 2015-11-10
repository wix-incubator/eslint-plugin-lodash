'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/collection-return');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('collection-return', rule, {
    valid: [
        '_.forEach(arr, function(a) { console.log(a)})',
        '_.map(arr, function(a) { return a*a})',
        {
            ecmaFeatures: {arrowFunctions: true},
            code: '_.map(arr, a => a + 1)'
        },
        '_.map(arr, function(a) {return a.some(function(x) {})})'
    ],
    invalid: [{
        code: '_.map(arr, function(a) {console.log(a)})',
        errors: [{message: 'Do not use _.map without returning a value'}]
    }, {
        code: '_.every(arr, function(a){f(a)})',
        errors: [{message: 'Do not use _.every without returning a value'}]
    }, {
        code: '_.map(arr, function(a){ a.every(function(b) {return b})})',
        errors: [{message: 'Do not use _.map without returning a value'}]
    }, {
        code: '_.reduce(arr, a => {f(a)})',
        errors: [{message: 'Do not use _.reduce without returning a value'}],
        ecmaFeatures: {arrowFunctions: true}
    }]
});
