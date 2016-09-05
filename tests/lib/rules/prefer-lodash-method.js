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
ruleTester.run('prefer-lodash-method', rule, {
    valid: [
        'var x = _.map(arr, f)',
        'var x = _(arr).map(f).reduce(g)',
        'var x = _.chain(arr).map(f).reduce(g).value()',
        'var x = _.keys(obj)',
        'var x = arr.indexOf(item)',
        {
            code: 'var x = a.map(f)',
            options: [{except: ['map']}]
        }, {
            code: 'var x = fp.map(f, a)',
            options: [{ignoreObjects: ['fp']}]
        }, {
            code: 'var x = React.Children.map(f)',
            options: [{ignoreObjects: ['React.Children']}]
        },
        {
            code: 'var x = $el.filter(f)',
            options: [{ignorePatterns: ['^\\$.+']}]
        },
        '_.chain(a).get(p).map(f).value()',
        'var x = Object.create(null)'
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

    }]
})
