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
var toErrorObject = require('../testUtil/toErrorObject').fromMessage('Do not use chain syntax for single method');

ruleTester.run('no-single-chain', rule, {
    valid: [
        'var x = _.map(arr, f)',
        'var x = _(arr).map(f).filter(g).value()'
    ],
    invalid: [
        'var x = _(arr).map(f).value()',
        'var x = _(arr).reduce(f, i)'
    ].map(toErrorObject)
});
