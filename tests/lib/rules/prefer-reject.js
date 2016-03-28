'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-reject')
const RuleTester = require('eslint').RuleTester

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
const errors = [{message: 'Prefer _.reject over negative condition'}]
ruleTester.run('prefer-reject', rule, {
    valid: [
        '_.filter(users, function(user) {return !user.active && isSomething;});',
        '_.filter(users, function(user) {return !f(user);});'
    ],
    invalid: [{
        code: '_(users).map(t).filter(function(user) {return !user.name.givenName})',
        errors    }, {
        code: '_.filter(users, function(user) {return user.name.givenName !== "Bob";});',
        errors    }, {
        code: '_.filter(users, function(user) {return !user.isSomething;});',
        errors    }, {
        code: '_.filter(arr, user => !user.active)',
        parserOptions: {ecmaVersion: 6},
        errors    }]
})
