'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-startswith');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var toErrorObject = require('../testUtil/toErrorObject')
    .fromMessage('Prefer _.startsWith instead of _.indexOf(...,) === 0');

ruleTester.run('prefer-startswith', rule, {
    valid: [
        '_.indexOf(a, b) == 10',
        '_.indexOf(a, b) === 10',
        '_.indexOf(a, b) === -1',
        'if (_.indexOf(a.b.c, b.c)) {}'
    ],
    invalid: [
        '_.indexOf(a, b) === 0',
        '_.indexOf(a.b.c, "b") == 0',
        '_.indexOf(a, b) !== 0',
        '_.indexOf(a.b.c.d, "b") != 0',
        '_.indexOf(a.b, b.c) === 0',
        '_.indexOf(a.b.c, b.c) !== 0',
        'if (_.indexOf(a.b.c, b.c) === 000) {}'
    ].map(toErrorObject)
});
