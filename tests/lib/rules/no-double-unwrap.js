'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-double-unwrap');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run('no-double-unwrap', rule, {
    valid: [
        'var x = _(a).map(f).reduce(g)',
        'var x = _(a).map(f).value()',
        'var x = _.chain(a).reduce(f).value()',
        'var x = something.value()'
    ],
    invalid: [{
        code: 'var x = _(a).some(f).value();',
        errors: [{message: 'Do not use .value() after chain-ending method some'}],
        output: 'var x = _(a).some(f);'
    }]
});
