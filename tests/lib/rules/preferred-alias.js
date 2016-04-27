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
const toErrorObject = require('../testUtil/optionsUtil').fromMessage("Method 'each' is an alias, for consistency prefer using 'forEach'")
ruleTester.run('preferred-alias', rule, {
    valid: [
        '_.forEach();',
        '_(users).map().value().each(function (i) { i.f(); });',
        'var x = _.map(y, function (i) { return i; });'
    ],
    invalid: [
        {code: '_.each(users, function (i) { i.f(); });', output: '_.forEach(users, function (i) { i.f(); });'},
        '_(users).each(function (i) { i.f(); });',
        '_(users).map(function (i) { return i; }).each(function (i) {});'
    ].map(toErrorObject)
})
