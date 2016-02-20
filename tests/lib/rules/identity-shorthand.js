'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/identity-shorthand');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();

var messages = {
    always: 'Prefer omitting the iteratee over a function that returns its argument',
    never: 'Do not use the identity shorthand syntax'
};

ruleTester.run('identity-shorthand', rule, {
    valid: [
        'var ids = _.map([], function (i) { return x; });',
        'var ids = _.map([], function (i) { return i + "?"; });',
        'var r = _.map([], function() { return; })',
        'var ids = _.map([]);',
        {
            code: 'var r = _.map([], function(x) { return x; })',
            options: ['never']
        }, {
            code: 'var r = _.map([], x => x)',
            options: ['never'],
            ecmaFeatures: {arrowFunctions: true}
        }
    ],
    invalid: [{
        code: 'var ids = _.map([], function (i) { return i; });',
        errors: [{message: messages.always, column: 21}]
    }, {
        code: 'var r = _.map([], x => x);',
        ecmaFeatures: {arrowFunctions: true},
        errors: [{message: messages.always, column: 19}]
    }, {
        code: 'var ids = _.chain([]).map(function (i) { return i; }).value();',
        errors: [{message: messages.always, column: 27}]
    }, {
        code: 'var ids = _([]).map(function (i) { return i; });',
        errors: [{message: messages.always, column: 21}]
    }, {
        code: 'var ids = _.map(arr);',
        options: ['never'],
        errors: [{message: messages.never, column: 13}]
    }, {
        code: 'var ids = _(arr).map("x").map("y").map(function (i) { return i; });',
        errors: [{message: messages.always, column: 40}]
    }]
});
