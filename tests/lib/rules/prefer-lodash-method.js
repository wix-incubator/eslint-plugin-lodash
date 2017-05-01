'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-lodash-method')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma, fromVersion3WithDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('prefer-lodash-method', rule, {
    valid: [
        ...[
            'var x = _.map(arr, f)',
            'var x = _(arr).map(f).reduce(g)',
            'var x = _.chain(arr).map(f).reduce(g).map(h).value()',
            'var x = _.keys(obj)',
            'var x = arr.indexOf(item)',
            {
                code: 'var x = a.map(f)',
                options: [{ignoreMethods: ['map']}]
            }, {
                code: 'var x = fp.map(f, a)',
                options: [{ignoreObjects: ['fp']}]
            }, {
                code: 'var x = React.Children.map(f)',
                options: [{ignoreObjects: ['React.Children']}]
            },
            {
                code: 'var x = $el.filter(f)',
                options: [{ignoreObjects: ['^\\$.+']}]
            },
            '_.chain(a).get(p).map(f).value()',
            'var x = Object.create(null)'
        ].map(withDefaultPragma),
        ...[
            'var x = str.replace(something, withSomething)'
        ].map(fromVersion3WithDefaultPragma)
    ],
    invalid: [{
        code: 'var x = a.map(function(x) {return x.f()});',
        errors: [{message: 'Prefer \'_.map\' over the native function.'}]
    }, {
        code: 'var x = _(arr).map(f).filter(g).value().map(h);',
        errors: [{message: 'Prefer \'_.map\' over the native function.'}]
    }, {
        code: 'var x = arr.filter(x => x.f())',
        errors: [{message: 'Prefer \'_.filter\' over the native function.'}]
    }, {
        code: 'var x = Object.keys(node)',
        errors: [{message: "Prefer '_.keys' over the native function."}]
    }, {
        code: 'var x = Object.create(foo)',
        errors: [{message: "Prefer '_.create' over the native function."}]
    }, {
        code: 'var x = fn().endsWith("something")',
        errors: [{message: "Prefer '_.endsWith' over the native function."}]
    }, {
        code: 'var x = str.endsWith("something")',
        errors: [{message: "Prefer '_.endsWith' over the native function."}]
    }, {
        code: 'var x = str.includes("something")',
        errors: [{message: "Prefer '_.includes' over the native function."}]
    }, {
        code: 'var x = str.padEnd(42)',
        errors: [{message: "Prefer '_.padEnd' over the native function."}]
    }, {
        code: 'var x = str.padStart(42, "foo")',
        errors: [{message: "Prefer '_.padStart' over the native function."}]
    }, {
        code: 'var x = str.repeat(42)',
        errors: [{message: "Prefer '_.repeat' over the native function."}]
    }, {
        code: 'var x = str.replace("foo", "bar")',
        errors: [{message: "Prefer '_.replace' over the native function."}]
    }, {
        code: 'var x = str.split("-")',
        errors: [{message: "Prefer '_.split' over the native function."}]
    }, {
        code: 'var x = str.startsWith("something")',
        errors: [{message: "Prefer '_.startsWith' over the native function."}]
    }, {
        code: 'var x = str.toUpperCase()',
        errors: [{message: "Prefer '_.toUpper' over the native function."}]
    }, {
        code: 'var x = str.toLowerCase()',
        errors: [{message: "Prefer '_.toLower' over the native function."}]
    }, {
        code: 'var x = str.trim()',
        errors: [{message: "Prefer '_.trim' over the native function."}]
    }].map(withDefaultPragma)
})
