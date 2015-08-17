'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-chain');
var RuleTester = require('eslint').RuleTester;

//require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('preferred-alias', rule, {
    valid: [{
        code: 'var isPublic = _.map([], function (i) { return x.id; });'
    }, {
        code: 'var isPublic = _.map([], function (i) { return x.id + "?"; });'
    }],
    invalid: [{
        code: [
            "var user = _.find(_.map(users, 'id'), 3)"
        ].join('\n'),
        errors: [{
            message: 'Prefer chaining to composition'
        }]
    }]
});
