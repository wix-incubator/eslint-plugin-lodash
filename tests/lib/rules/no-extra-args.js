'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-extra-args');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('no-extra-args', rule, {
    valid: [
        'var x = _.uniq(arr);',
        'var x = _.assign(a, b, c, d, e);'
    ],
    invalid: [{
        code: 'var x = _.uniq(arr, "prop");',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 1).'}]
    }, {
        code: 'var x = _(arr).filter(f).uniq(arr, "prop").value();',
        errors: [{message: 'Too many arguments passed to `uniq` (expected 0).'}]
    }]
});
