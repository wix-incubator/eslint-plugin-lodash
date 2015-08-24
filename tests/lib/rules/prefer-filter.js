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
var ruleError = {message: 'Prefer _.filter or _.some over an if statement inside a _.forEach'};
ruleTester.run('prefer-filter', rule, {
    valid: [{
        code: 'var x = _.filter(arr, function(x) {return x + 7})'
    }, {
        code: '_.forEach(arr, function(x) { if (x.a) {} else {}})'
    }, {
        code: '_.forEach(arr, function(x) {if (y) {}})'
    }, {
        code: '_.forEach(arr, function(x, y) { if (x){} })'
    }],
    invalid: [{
        code: '_(arr).forEach(function(x) { if (x.a) {}})',
        errors: [ruleError]
    }, {
        code: '_(arr).forEach(function(x) { if (x) {}})',
        errors: [ruleError]
    }, {
        code: '_.forEach(arr, function(x) { if (x.a === b) {}})',
        errors: [ruleError]
    }, {
        code: '_.forEach(arr, function(x) { if (x.a !== b) {}})',
        errors: [ruleError]
    }, {
        code: '_.forEach(arr, function(x) { if (!x.a) {}})',
        errors: [ruleError]
    }]
});
