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
    valid: [{
        code: 'var x = _(a).map(f).reduce(g)'
    }, {
        code: 'var x = _(a).map(f).value()'
    }, {
        code: 'var x = _.chain(a).reduce(f).value()'
    }],
    invalid: [{
        code: 'var x = _(a).reduce(f).value();',
        errors: [{message: 'Do not use .value() after chain-ending method reduce'}]
    }]
});
