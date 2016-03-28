'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../src/rules/prefer-lodash-chain');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('prefer-lodash-chain', rule, {
    valid: [
        'var userNames = _.map(users, "name.givenName").join(" ");',
        'var userNames = _(users).filter("active").map("name.givenName").value().toString();',
        {
            code: 'var minAgePerName = _(users).groupBy("name").map(sameName => _.minBy(sameName, "age")).value()',
            parserOptions: {ecmaVersion: 6}
        }
    ],
    invalid: [
        {
            code: 'var userNames = _.filter(users, cb1).map(cb2);',
            errors: [{message: "Do not break chain before method 'map'."}]
        },
        {
            code: 'var userNames = _(users).map("name.givenName").value().join(" ");',
            errors: [{message: "Do not break chain before method 'join'."}]
        }
    ]
});
