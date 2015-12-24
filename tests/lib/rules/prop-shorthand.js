'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prop-shorthand');
var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = {
    always: [{message: 'Prefer property shorthand syntax'}],
    never: [{message: 'Do not use property shorthand syntax'}]
};

ruleTester.run('prop-shorthand', rule, {
    valid: [
        'var ids = _.map([], function (i) { return x.id; });',
        'var ids = _.map([], function (i) { return i.id + "?"; });',
        'var publicModules = _(files).map(readModule).compact().value();',
        'var ids = _.map([], function (i) { return i[0]; });',
        'var ids = _.map([], function (i) { return i[k]; });',
        'var r = _.map([], function() { return React.PropTypes.object; })',
        'var r = _.map([])',
        {
            code: 'var r = _.map([], function(x) { return x.id})',
            options: ['never']
        },
        {
            code: 'var r = _.map([], x => x.id)',
            options: ['never'],
            ecmaFeatures: {arrowFunctions: true}
        }
    ],
    invalid: [{
        code: 'var ids = _(arr).map(function (i) { return i.a.b.c; });',
        errors: errors.always
    }, {
        code: 'var ids = _.map([], function (i) { return i.a; });',
        errors: errors.always
    }, {
        code: 'var ids = _(arr).map("x").map("y").map(function (i) { return i.a.b; });',
        errors: errors.always
    }, {
        code: 'var ids = _.map([], function (i) { return i["a"]; });',
        errors: errors.always
    }, {
        code: 'var ids = _.map([], i => i.a.b.c);',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors.always
    }, {
        code: 'var ids = _.map(arr, "id");',
        options: ['never'],
        errors: errors.never
    }]
});
