'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-chain')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------
const {withDefaultPragma} = require('../testUtil/optionsUtil')
const ruleTester = ruleTesterUtil.getRuleTester()
ruleTester.run('prefer-chain', rule, {
    valid: [{
        code: 'var isPublic = _.map([], function (i) { return x.id; });',
        options: [2]
    }, {
        code: 'var isPublic = _.map([], function (i) { return _.now() });',
        options: [2]
    }, {
        code: 'var isPublic = _.map([], function (i) { return x.id + "?"; });',
        options: [2]
    }, {
        code: 'var isPublic = _.find(_.map(users, "id"), 3)',
        options: [3]
    }, {
        code: 'var isPublic = _.find(_.map(users, "id"), 3)'
    }].map(withDefaultPragma),
    invalid: [{
        code: "var user = _.find(_.map(users, 'id'), 3)",
        errors: [{
            message: 'Prefer chaining to composition'
        }],
        options: [2]
    }].map(withDefaultPragma)
})
