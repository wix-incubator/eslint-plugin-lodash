'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/matches-shorthand');
var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer matches syntax'}];
ruleTester.run('matches-prop-shorthand', rule, {
    valid: [
        'var isPublic = _.find([], function (i) { return x.id; });',
        'var r = _.findIndex(this.packages, {name: name});',
        'var isPublic = _.map([], function (i) { return i.id + "?"; });',
        'lang.fonts = _.filter(lang.fonts, function (font) { return font.permissions !== "legacy"});',
        'var isPublic = _.findLastIndex([], function (i) { return i.id == 3; });',
        'var isPublic = _.select([], function (i) { return i[0] === 3; });',
        {
            code: 'var isPublic = _.find([], i => i[0] === 3);',
            ecmaFeatures: {arrowFunctions: true}
        }
    ],
    invalid: [{
        code: 'var isPublic = _.find([], function (i) { return i.id === 3; });',
        errors: errors
    }, {
        code: 'var isPublic = _.detect([], function (i) { return i.id === 3 && i.a === "string" && {a: 10} === i.b;});',
        errors: errors
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3)',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: 'var isPublic = _.select(arr, i => i.id === 3 && i.a === "string" && {a: 10} === i.b)',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: 'var isPublic = _.findIndex(arr, (i) => {return i.id === 3})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: 'var isPublic = _.some(arr, (i) => {return i.id === 3 && i.a === "string" && {a: 10} === i.b})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: 'var isPublic = _.every(arr, (i) => {return i.id === b.id})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: '_.findLastIndex(arr, function(i) { return i.b.c === compId; });',
        errors: errors
    }]
});
