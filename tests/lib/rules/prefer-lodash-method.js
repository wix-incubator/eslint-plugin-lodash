'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-lodash-method');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer \'_.map\' over the native function.'}];
ruleTester.run('prefer-lodash-method', rule, {
    valid: [
        'var x = _.map(arr, f)',
        'var x = _(arr).map(f).reduce(g)',
        'var x = _.chain(arr).map(f).reduce(g).value()'
    ],
    invalid: [{
        code: 'var x = a.map(function(x) {return x.f()});',
        errors: errors
    }, {
        code: 'var x = arr.map(x => x.f())',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }]
});
