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
        'class A { m() {}}',
        'var x = function * () {}',
        {code: 'var x = async function () {}', parserOptions: {ecmaVersion: 8}},
        {code: 'x = () => { /* no-op for now */ }', options: [{ifContainsComment: true}]}
    ].map(withDefaultPragma),
    invalid: [
        'functionWithCb(function() {})',
        'x = function(){/* */}',
        'CallCb(()=> {})',
        {code: 'x = () => { /* no-op for now */ }', options: [{ifContainsComment: false}]}
    ].map(toErrorObject).map(withDefaultPragma)
})
