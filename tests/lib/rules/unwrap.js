'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/unwrap');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = {message: 'Missing unwrapping at end of chain'};
ruleTester.run('unwrap', rule, {
    valid: [{
        code: 'var x = _(a).map(f).reduce(g)'
    }, {
        code: 'var x = _(a).map(f).filter(g).value()'
    }, {
        code: 'var x = _.chain(a).map(f).value()'
    }, {
        code: 'var stillWrapped = _(a).forEach(f).commit();'
    }],
    invalid: [{
        code: 'var x = _(a).map(f);',
        errors: [ruleError]
    }, {
        code: 'var x = _.chain(a).map(f)',
        errors: [ruleError]
    }, {
        code: 'var x = _.chain(a).map(f).reduce(g)',
        errors: [ruleError]
    }]
});
