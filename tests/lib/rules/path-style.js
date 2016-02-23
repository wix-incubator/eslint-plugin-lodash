'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/path-style');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('path-style', rule, {
    valid: [
        "var aProp = _.property('a')",
        "var t = _.get(x, ['a', 'b'])",
        "var t = _.invoke(a, 'b');",
        {code: "var t = _.has(x, 'a.b')", options: ['string']},
        {code: "_.set(x, ['a'], t)", options: ['array']},
        "var t = _.replace(a, 'a', 'b')"
    ],
    invalid: [{
        code: "var t = _.get(x, 'a.b');",
        errors: [{message: 'Use an array for deep paths', column: 18}]
    }, {
        code: "var t = _.matchesProperty('a.b', val);",
        errors: [{message: 'Use an array for deep paths', column: 27}]
    }, {
        code: "var t = _.has(x, ['a']);",
        errors: [{message: 'Use a string for single-level paths', column: 18}]
    }, {
        code: "var t = _(x).assign(obj).get('a.b')",
        errors: [{message: 'Use an array for deep paths', column: 30}]
    }, {
        code: "var t = _.get(x, 'a[0]');",
        errors: [{message: 'Use an array for deep paths', column: 18}]
    }, {
        code: "var t = _.get(x, 'a');",
        errors: [{message: 'Use an array for paths', column: 18}],
        options: ['array']
    }, {
        code: "var t = _.get(x, ['a', 'b']);",
        errors: [{message: 'Use a string for paths', column: 18}],
        options: ['string']
    }]
});
