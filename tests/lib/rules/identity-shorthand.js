'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/identity-shorthand')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')

const messages = {
    always: 'Prefer omitting the iteratee over a function that returns its argument',
    never: 'Do not use the identity shorthand syntax'
}

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
            options: ['never']
        },
        'var twos = _.mapValues(a, function() { return 2; });',
        {
            code: 'var x = _.reverse(a)',
            options: ['never']
        }, {
            code: 'var x = _(a).filter(f).pick("prop").value()',
            options: ['never']
        }, {
            code: 'var x = _.uniq(a, x => x)',
            options: ['never']
        }
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var ids = _.map([], function (i) { return i; });',
        errors: [{message: messages.always, column: 21}]
    }, {
        code: 'var r = _.map([], x => x);',
        errors: [{message: messages.always, column: 19}]
    }, {
        code: 'var ids = _.chain([]).map(function (i) { return i; }).value();',
        errors: [{message: messages.always, column: 27}]
    }, {
        code: 'var ids = _([]).map(function (i) { return i; });',
        errors: [{message: messages.always, column: 21}]
    }, {
        code: 'var ids = _([]).map(_.identity).value();',
        errors: [{message: messages.always, column: 21}]
    }, {
        code: 'var ids = _.map(arr);',
        options: ['never'],
        errors: [{message: messages.never, column: 13}]
    }, {
        code: 'var ids = _(arr).map("x").map("y").map(function (i) { return i; });',
        errors: [{message: messages.always, column: 40}]
    }].map(withDefaultPragma)
})
