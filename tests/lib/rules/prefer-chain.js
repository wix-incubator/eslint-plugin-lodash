'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-chain');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('prefer-chain', rule, {
    valid: [{
        code: 'var isPublic = _.map([], function (i) { return x.id; });',
        options: [2]
    }, {
        code: 'var isPublic = _.map([], function (i) { return x.id + "?"; });',
        options: [2]
    }, {
        code: 'var isPublic = _.find(_.map(users, \'id\'), 3)',
        options: [3]
    }, {
        code: 'var isPublic = _.some(attrs, \'Public\')',
        options: [1]
    }],
    invalid: [{
        code: "var user = _.find(_.map(users, 'id'), 3)",
        errors: [{
            message: 'Prefer chaining to composition'
        }],
        options: [2]
    }]
});
