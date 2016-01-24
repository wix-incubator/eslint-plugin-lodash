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
var toErrorObject = require('../testUtil/optionsUtil').fromMessage('Missing unwrapping at end of chain');
ruleTester.run('unwrap', rule, {
    valid: [
        'var x = _(a).map(f).reduce(g)',
        'var x = _(a).map(f).filter(g).value()',
        'var x = _.chain(a).map(f).value()',
        'var stillWrapped = _(a).forEach(f).commit();'
    ],
    invalid: [
        'var x = _(a).map(f);',
        'var x = _.chain(a).map(f)',
        'var x = _.chain(a).map(f).reduce(g)'
    ].map(toErrorObject)
});
