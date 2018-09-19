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
const {withDefaultPragma} = require('../testUtil/optionsUtil')

const testCases = {
    valid: {
        always: [
            'var x = _.map(a, f)',
            'var x = _(a).map(f).reduce(g, {})'
        ].map(code => ({code, options: ['always']})),
        cutoff: [
            'var x = _.map(_.filter(a, g), f)'
        ].map(code => ({code, options: ['always', 3]})),
        never: [
            'var x = _.map(_.filter(_.uniq(a), g), f)'
        ].map(code => ({code, options: ['never']})),
        default: [
            'import {map, filter, uniq} from "lodash"; var x = map(filter(uniq(a), g), f)'
        ].map(code => ({code, parserOptions: {sourceType: 'module'}})),
        implicit: [
            'var x = _(x).map(f).filter(g).uniq().value()',
            'var x = _.map(_.compact(_.cloneDeep(t)), f)'
        ].map(code => ({code, options: ['implicit']}))
    },
    invalid: {
        always: [
            'var x = _.map(_.filter(_.uniq(a), g), f)',
            'import _map from "lodash/map"; import _filter from "lodash/filter"; var x = _map(_filter(_.uniq(a), g), f)'
        ].map(code => ({
            code, 
            options: ['always'], 
            parserOptions: {sourceType: 'module'},
            errors: [{messageId: 'always'}]
        })),
        single: [
            'var x = _(a).map(f).value()',
            'var x = _(a).reduce(g, {})'
        ].map(code => ({
            code, 
            options: ['always'],
            errors: [{messageId: 'single'}]
        })),
        never: [
            'var x = _.chain(a).map(f).reduce(g, {}).get(h).value',
            'var x = _(a).map(f).reduce(g, {})',
            'var x = _(a).map(f).value()',
            'var x = _(a).reduce(g, {})'
        ].map(code => ({
            code, 
            options: ['never'],
            errors: [{messageId: 'never'}]
        })),
        implicit: [
            'var x = _.map(_.filter(_.uniq(a), g), f)',
            "var x = _.get(_.filter(_.uniq(a), g), 'a')"
        ].map(code => ({
            code, 
            options: ['implicit'],
            errors: [{messageId: 'always'}]
        })),
        implicitSingle: [
            'var x = _(a).map(f).value()'
        ].map(code => ({
            code, 
            options: ['implicit'],
            errors: [{messageId: 'single'}]
        }))
    }
}


ruleTester.run('chaining', rule, {
    valid: [
        ...testCases.valid.always,
        ...testCases.valid.cutoff,
        ...testCases.valid.never,
        ...testCases.valid.default,
        ...testCases.valid.implicit
    ].map(withDefaultPragma),
    invalid: [
        ...testCases.invalid.always,
        ...testCases.invalid.single,
        ...testCases.invalid.never,
        ...testCases.invalid.implicit,
        ...testCases.invalid.implicitSingle
    ].map(withDefaultPragma)
})
