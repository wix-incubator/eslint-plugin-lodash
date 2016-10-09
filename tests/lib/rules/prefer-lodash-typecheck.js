'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-lodash-typecheck')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')
const errors = {
    undefined: [{message: 'Prefer \'_.isUndefined\' over \'typeof\' comparison.'}],
    typeof: [{message: 'Prefer \'_.isNumber\' over \'typeof\' comparison.'}],
    instanceof: [{message: 'Prefer \'_.isArray\' over \'instanceof Array\'.'}]
}
ruleTester.run('prefer-lodash-typecheck', rule, {
    valid: [
        'var x = a instanceof B',
        'var x = a > b ? a : b',
        'var x = typeof a === typeof b',
        'var x = typeof y === "undefined"'
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var x = typeof a === "number"',
        errors: errors.typeof
    }, {
        code: 'var x = "number" !== typeof a',
        errors: errors.typeof
    }, {
        code: 'var x = a instanceof Array',
        errors: errors.instanceof
    }, {
        code: 'var x = typeof a.b === "undefined"',
        errors: errors.undefined
    }, {
        code: 'var y; var x = typeof y === "undefined"',
        errors: errors.undefined
    }].map(withDefaultPragma)
})
