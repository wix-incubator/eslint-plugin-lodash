'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-reject')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const toErrorObject = require('../testUtil/optionsUtil').fromMessage('Prefer _.reject over negative condition')
ruleTester.run('prefer-reject', rule, {
    valid: [
        '_.filter(users, function(user) {return !user.active && isSomething;});',
        '_.filter(users, function(user) {return !f(user);});'
    ],
    invalid: [
        '_(users).map(t).filter(function(user) {return !user.name.givenName})',
        '_.filter(users, function(user) {return user.name.givenName !== "Bob";});',
        '_.filter(users, function(user) {return !user.isSomething;});',
        '_.filter(arr, user => !user.active)',
        `_.filter(arr, _.negate(f));`
    ].map(toErrorObject)
})
