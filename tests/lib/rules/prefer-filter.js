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
        code: '_.forEach(arr, function(x) { if (x) {} else {}})'
    }],
    invalid: [{
        code: '_(arr).forEach(function(x) { if (x) {}})',
        errors: [ruleError]
    }, {
        code: '_.forEach(arr, function(x) { if (x) {}})',
        errors: [ruleError]
    }]
});
