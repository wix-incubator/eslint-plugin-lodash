'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-single-chain');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = {message: 'Do not use chain syntax for single method'};
ruleTester.run('no-single-chain', rule, {
    valid: [{
        code: 'var x = _.map(arr, f)'
    }, {
        code: 'var x = _(arr).map(f).filter(g).value()'
    }],
    invalid: [{
        code: 'var x = _(arr).map(f).value()',
        errors: [ruleError]
    }, {
        code: 'var x = _(arr).reduce(f, i)',
        errors: [ruleError]
    }]
});
