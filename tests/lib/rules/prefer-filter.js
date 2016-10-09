'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-filter')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.filter or _.some over an if statement inside a _.forEach')

ruleTester.run('prefer-filter', rule, {
    valid: [
        'var x = _.filter(arr, function(x) {return x + 7})',
        '_.forEach(arr, function(x) { if (x.a) {} else {}})',
        '_.forEach(arr, function(x) {if (y) {}})',
        '_.forEach(arr, function(x, y) { if (x){} })'
    ].map(withDefaultPragma),
    invalid: [
        '_(arr).forEach(function(x) { if (x.a.b.c) {}})',
        '_(arr).forEach(function(x) { if (x) {}})',
        '_.forEach(arr, function(x) { if (x.a.b.c === d) {}})',
        '_.forEach(arr, function(x) { if (x.a.b.c !== d) {}})',
        '_.forEach(arr, function(x) { if (!x.a.b.c) {}})'
    ].map(withDefaultPragma).concat([{
        code: 'import f from "lodash/forEach"; f(arr, (x) => { if (x) {}})',
        parserOptions: {
            sourceType: 'module'
        }
    }]).map(toErrorObject)
})
