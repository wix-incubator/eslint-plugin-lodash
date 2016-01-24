'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-thru');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var toErrorObject = require('../testUtil/optionsUtil').fromMessage('Prefer using thru instead of function call in chain start.');
ruleTester.run('prefer-thru', rule, {
    valid: [
        'var x = _(str).thru(f).map(g).reduce(h);',
        'var x = _(f(a,b)).map(g).reduce(h);',
        'var x = _(f("img")).map(g).reduce(h);'
    ],
    invalid: [
        '_(f(str)).map(g).reduce(h)',
        '_.chain(f(str.split(c))).map(h).reduce(g).value()'
    ].map(toErrorObject)
});
