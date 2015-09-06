'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-map');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = {message: 'Prefer _.map over a _.forEach with a push to an array inside'};
ruleTester.run('prefer-map', rule, {
    valid: [{
        code: 'var x = _.map(arr, function(x) {return x + 7})'
    }, {
        code: '_.forEach(arr, function(x) { if (x.a) {a.push(x)}})'
    }],
    invalid: [{
        code: '_(arr).forEach(function(x) { a.push(x)})',
        errors: [ruleError]
    }, {
        code: '_(arr).forEach(function(x) { a.push(f(x))})',
        errors: [ruleError]
    }, {
        code: '_(arr).forEach(x => a.push(f(x)))',
        ecmaFeatures: {arrowFunctions: true},
        errors: [ruleError]
    }]
});
