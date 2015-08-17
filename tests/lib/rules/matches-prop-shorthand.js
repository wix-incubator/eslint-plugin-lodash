'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/matches-prop-shorthand');
var RuleTester = require('eslint').RuleTester;

// require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('matches-prop-shorthand', rule, {
    valid: [{
        code: 'var isPublic = _.find([], function (i) { return x.id; });'
    }, {
        code: 'var r = _.find(this.packages, {name: name});'
    }, {
        code: 'var isPublic = _.map([], function (i) { return i.id + "?"; });'
    }],

    invalid: [{
        code: 'var isPublic = _.find([], function (i) { return i.id === 3; });',
        errors: [{
            message: 'Prefer matches property syntax'
        }]
    }]
});
