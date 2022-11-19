'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-nullish-coalescing')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma, fromMessage} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer nullish coalescing over checking a ternary with !isNil.')
ruleTester.run('prefer-nullish-coalescing', rule, {
    valid: [
        {code: 'const myExpression = myVar ?? myOtherVar;', parserOptions: {ecmaVersion: 2020}},
        'const myExpression = !isNil(myVar) ? mySecondVar : myThirdVar;',
        'const myExpression = myOtherVar ? myVar : !isNil(myVar);',
        'const myExpression = myOtherVar ? !isNil(myVar) : myVar;',
        {code: 'const myExpression = (myVar ?? myOtherVar) ? doThis() : doThat();', parserOptions: {ecmaVersion: 2020}},
        {code: 'const myExpression = (myVar?.thisProp ?? myOtherVar[thatProp]) ? doThis() : doThat();', parserOptions: {ecmaVersion: 2020}},
        {code: 'myVar ?? myOtherVar;', parserOptions: {ecmaVersion: 2020}}
    ].map(withDefaultPragma),
    invalid: [
        {code: 'const myExpression = !isNil(myVar) ? myVar : myOtherVar;', output: 'const myExpression = myVar ?? myOtherVar;', parserOptions: {ecmaVersion: 2020}},
        {code: '!isNil(myVar) ? myVar : myOtherVar;', output: 'myVar ?? myOtherVar;', parserOptions: {ecmaVersion: 2020}}
    ].map(withDefaultPragma).map(toErrorObject)
})