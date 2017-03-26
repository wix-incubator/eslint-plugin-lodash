'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/preferred-alias')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage("Method 'each' is an alias, for consistency prefer using 'forEach'")
ruleTester.run('preferred-alias', rule, {
    valid: [
        '_.forEach();',
        '_(users).map().value().each(function (i) { i.f(); });',
        'var x = _.map(y, function (i) { return i; });',
        'var customResult = _.customFunction(customArg1, customArg2)'
    ].map(withDefaultPragma).concat([
        "const {toString} = require('lodash'); toString('something')"
    ]),
    invalid: [
        '_.each(users, function (i) { i.f(); });',
        '_(users).each(function (i) { i.f(); });',
        '_(users).map(function (i) { return i; }).each(function (i) {});'
    ].map(withDefaultPragma).concat([
        'const each = require("lodash/each"); each(a, f)'
    ]).map(toErrorObject)
})
