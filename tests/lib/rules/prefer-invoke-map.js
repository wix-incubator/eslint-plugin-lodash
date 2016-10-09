'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-invoke-map')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()

const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.invokeMap over map to a method call.')
ruleTester.run('prefer-invoke-map', rule, {
    valid: [
        'var x = _.invokeMap(arr, "f")',
        'var x = _.invokeMap(arr, "split", " ")',
        'const x = _.map(arr, ({a}) => f(a))'
    ].map(withDefaultPragma),
    invalid: [
        '_.map(a, function(x) {return x.f()});',
        '_(a).filter(f).map(function(x) { return x.split(" ")})',
        '_.map(arr, x => x.f())'
    ].map(withDefaultPragma).concat([{
        code: 'import m from "lodash/map"; m(a, x => x.f())',
        parserOptions: {
            sourceType: 'module'
        }
    }]).map(toErrorObject)
})
