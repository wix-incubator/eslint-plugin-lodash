'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-times')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const toErrorObject = fromMessage('Prefer _.times over _.map without using arguments')
ruleTester.run('prefer-times', rule, {
    valid: [
        'var a = _.map(arr, function(x) {return x + 1});',
        '_.forEach(arr, function() {f(g(r)); })',
        'var results = _.times(arr.length, function() {return Math.random();})',
        'var x = _.map(a, "prop");',
        'var x = _.map(arr, function(a) {return _.map(a, function(b) {return b + 1});});',
        "var x = arr.map(function () {return str; }).join('')",
        'var x = _.map(a, ({x}) => x);',
        'var x = _.map(a, ({f: x}) => x);',
        'var x = _.map(a, ({f: {x}}) => x);',
        '_.map(a, x => _.map(b, y => x.f(y)))',
        '_.map(arr, function(a, c = 1) {return b})',
    ].map(withDefaultPragma),
    invalid: [
        '_(arr).map(function(){return g}).value()',
        '_.map(arr, function() {return Math.random()});',
        '_(arr).map(() => a.push(f()))',
        '_(arr).map(() => a.push(f()))'
    ].map(withDefaultPragma).map(toErrorObject)
})
