'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-get')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.get or _.has over an \'&&\' chain')
ruleTester.run('prefer-get', rule, {
    valid: [
        'var x = _.get(a, "b.c");',
        'var x = _.has(a, "b.c");',
        'var x = a && a.b',
        'a && a.b && f()',
        'a && a[v] && a[v].c',
        'a && a.b && typeof a.b === "number"',
        'a && a.b && a.b.c + a.b.d'
    ].map(withDefaultPragma),
    invalid: [
        'x = a && a.b && a.b.c === 8',
        'x = a && a.b && a["b"].c && a.b.c.d',
        {
            code: 'x = a && a.b',
            options: [2]
        }, {
            code: 'x = a && a.b && a.b.c && a.b.c.d',
            options: [2]
        }].map(toErrorObject).map(withDefaultPragma)
})
