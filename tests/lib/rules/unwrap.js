'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/unwrap')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Missing unwrapping at end of chain')
ruleTester.run('unwrap', rule, {
    valid: [
        'var x = _(a).map(f).reduce(g)',
        'var x = _(a).map(f).filter(g).value()',
        'var x = _.chain(a).map(f).value()',
        'var stillWrapped = _(a).forEach(f).commit();',
        'var stillWrapper = _.chain(a).remove(f).commit();',
        'var unwrappedEarly = _(a).reduce(f, x).map(g)',
        'var unwrappedEarly = _.chain(a).map(f).value().map(g)'
    ].map(withDefaultPragma),
    invalid: [
        'var x = _(a).map(f);',
        'var x = _.chain(a).map(f)',
        'var x = _.chain(a).map(f).reduce(g)'
    ].map(toErrorObject).map(withDefaultPragma)
})
