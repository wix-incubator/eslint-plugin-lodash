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
        code: [
            'var isPublic = _.find([], function (i) { return x.id; });'
        ].join('\n')
    }, {
        code: [
            'var isPublic = _.map([], function (i) { return i.id + "?"; });'
        ].join('\n')
    }],

    invalid: [{
        code: [
            'var isPublic = _.find([], function (i) { return i.id === 3; });'
        ].join('\n'),
        errors: [{
            message: 'Prefer matches property syntax'
        }]
    }]
});
