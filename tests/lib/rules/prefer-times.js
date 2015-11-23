'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-times');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.times over _.map without using arguments'}];
ruleTester.run('prefer-times', rule, {
    valid: [
        'var a = _.map(arr, function(x) {return x + 1});',
        '_.forEach(arr, function() {f(g(r)); })',
        'var results = _.times(arr.length, function() {return Math.random();})',
        'var x = _.map(a, "prop");',
        'var x = _.map(arr, function(a) {return _.map(a, function(b) {return b + 1});});',
        "var x = arr.map(function () {return str; }).join('')"
    ],
    invalid: [{
        code: '_(arr).map(function(){return g}).value()',
        errors: errors
    }, {
        code: '_.map(arr, function() {return Math.random()});',
        errors: errors
    }, {
        code: '_(arr).map(() => a.push(f()))',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: '_.map(arr, function(a, c = 1) {return b})',
        ecmaFeatures: {defaultParams: true},
        errors: errors
    }, {
        code: '_(arr).map(() => a.push(f()))',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }]
});
