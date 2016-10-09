'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-noop')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.noop over an empty function')

ruleTester.run('prefer-noop', rule, {
    valid: [
        'x = function() { return 2}',
        'x = function(x) {return x}',
        'x = a => a.b',
        'class A { m() {}}'
    ].map(withDefaultPragma),
    invalid: [
        'functionWithCb(function() {})',
        'x = function(){/* */}',
        'CallCb(()=> {})'
    ].map(toErrorObject).map(withDefaultPragma)
})
