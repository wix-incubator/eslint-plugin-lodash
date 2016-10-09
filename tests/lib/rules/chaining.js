'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/chaining')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
const messages = {
    always: 'Prefer chaining to composition',
    never: 'Prefer composition to Lodash chaining',
    single: 'Do not use chain syntax for single method'
}

const testCases = {
    valid: {
        always: [
            'var x = _.map(a, f)',
            'var x = _(a).map(f).reduce(g, {})',
        ].map(code => ({code, options: ['always']})),
        cutoff: [
            'var x = _.map(_.filter(a, g), f)'
        ].map(code => ({code, options: ['always', 3]})),
        never: [
            'var x = _.map(_.filter(_.uniq(a), g), f)'
        ].map(code => ({code, options: ['never']})),
        default: [
            'import {map, filter, uniq} from "lodash"; var x = map(filter(uniq(a), g), f)'
        ].map(code => ({code, parserOptions: {sourceType: 'module'}}))
    },
    invalid: {
        always: [
            'var x = _.map(_.filter(_.uniq(a), g), f)'
        ].map(code => ({code, options: ['always']})).map(fromMessage(messages.always)),
        single: [
            'var x = _(a).map(f).value()',
            'var x = _(a).reduce(g, {})'
        ].map(code => ({code, options: ['always']})).map(fromMessage(messages.single)),
        never: [
            'var x = _.chain(a).map(f).reduce(g, {}).get(h).value',
            'var x = _(a).map(f).reduce(g, {})',
            'var x = _(a).map(f).value()',
            'var x = _(a).reduce(g, {})'
        ].map(code => ({code, options: ['never']})).map(fromMessage(messages.never))
    }
}


ruleTester.run('chaining', rule, {
    valid: [
        ...testCases.valid.always,
        ...testCases.valid.cutoff,
        ...testCases.valid.never,
        ...testCases.valid.default
    ].map(withDefaultPragma),
    invalid: [
        ...testCases.invalid.always,
        ...testCases.invalid.single,
        ...testCases.invalid.never
    ].map(withDefaultPragma)
})
