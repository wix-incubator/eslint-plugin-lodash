'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-filter');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var toErrorObject = require('../testUtil/optionsUtil')
    .fromMessage('Prefer _.filter or _.some over an if statement inside a _.forEach');

ruleTester.run('prefer-filter', rule, {
    valid: [
        'var x = _.filter(arr, function(x) {return x + 7})',
        '_.forEach(arr, function(x) { if (x.a) {} else {}})',
        '_.forEach(arr, function(x) {if (y) {}})',
        '_.forEach(arr, function(x, y) { if (x){} })'
    ],
    invalid: [
        '_(arr).forEach(function(x) { if (x.a.b.c) {}})',
        '_(arr).forEach(function(x) { if (x) {}})',
        '_.forEach(arr, function(x) { if (x.a.b.c === d) {}})',
        '_.forEach(arr, function(x) { if (x.a.b.c !== d) {}})',
        '_.forEach(arr, function(x) { if (!x.a.b.c) {}})'
    ].map(toErrorObject)
});
