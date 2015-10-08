'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/matches-prop-shorthand');
var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer matches property syntax'}];
ruleTester.run('matches-prop-shorthand', rule, {
    valid: [
        'var isPublic = _.find([], function (i) { return x.id; });',
        'var r = _.find(this.packages, {name: name});',
        'var isPublic = _.map([], function (i) { return i.id + "?"; });',
        'lang.fonts = _.filter(lang.fonts, function (font) { return font.permissions !== "legacy"});',
        'var isPublic = _.find([], function (i) { return i.id == 3; });',
        'var isPublic = _.find([], function (i) { return i[0] === 3; });',
        {
            code: 'var isPublic = _.find([], i => i[0] === 3);',
            ecmaFeatures: {arrowFunctions: true}
        }],

    invalid: [{
        code: 'var isPublic = _.find([], function (i) { return i.id === 3; });',
        errors: errors
    }, {
        code: 'var isPublic = _.find(arr, i => i.id === 3)',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    }, {
        code: 'var isPublic = _.find(arr, (i) => {return i.id === 3})',
        ecmaFeatures: {arrowFunctions: true},
        errors: errors
    //}, {
    //    TODO: handle this
    //    code: '_.find(arr, function(i){ return i.b.c === compId; });',
    //    errors: [{message: 'Prefer matches property syntax'}]
    }]
});
