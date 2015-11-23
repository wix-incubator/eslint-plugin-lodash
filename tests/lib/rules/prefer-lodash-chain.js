'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-lodash-chain');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer lodash chain'}];
ruleTester.run('prefer-lodash-method', rule, {
    valid: [
        'var userNames = users.map(function(user) { return user.name; });',
        'var userNames = _(users).filter({active: true}).map("name").value();',
        'var userNames = _(users).map("name.givenName").reduce(function (res, cur) { return res + " " + cur; });',
        'var userNames = users.map(cb1).filter(cb2);',
        'var userNames = _(users).map(cb1).reduce(cb2).map(cb3);',
        'var userNames = _(users).map("name.givenName").join(" ");',
        'var userNames = _.map(users, "name.givenName").join(" ");'
    ],
    invalid: [
        'var userNames = _.filter(users, cb1).map(cb2);',
        'var userNames = _(users).map("name.givenName").value().join(" ");',
        'var userNames = _.filter(users, {active: true}).map(function (user) { return user.name.givenName; });',
        'var userNames = _(users).map("name.givenName").value().reduce(cb);',
        'var userNames = _(users).map(cb1).filter(cb2).map(cb3).value().reduce(cb4);',
        'var userNames = _(users).map("name.givenName").value().reduce(function (res, cur) { return res + " " + cur; });',
        'var userNames = _.chain(users).filter("active").map("name.givenName").value().reduce(cb);'
    ].map(function (code) {
        return {code: code, errors: errors};
    })
});
