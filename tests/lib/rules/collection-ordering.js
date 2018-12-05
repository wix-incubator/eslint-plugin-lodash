'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/collection-ordering')
const ruleTesterUtils = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtils.getRuleTester()
const {withDefaultPragma, fromMessageId, fromOptions} = require('../testUtil/optionsUtil')

const testCases = {
    valid: {
        sortBy: {
            off: [
                '_.sortBy(arr, f)',
                '_.sortBy(arr, [f])'
            ].map(withDefaultPragma),
            always: [
                '_.sortBy(arr, [f])',
                '_.sortBy(arr, ["name"])',
                '_.orderBy(arr, ["name"], ["desc"])'
            ].map(withDefaultPragma).map(fromOptions({options: [{useArray: 'always'}]})),
            asNeeded: [
                '_.sortBy(arr, f)',
                '_.sortBy(arr, "name")',
                '_.orderBy(arr, "name", "desc")',
                '_.sortBy(arr, [f, g])',
                '_(arr).map(f).sortBy(g).value()'
            ].map(withDefaultPragma).map(fromOptions({options: [{useArray: 'as-needed'}]}))
        },
        orderBy: {
            off: [
                '_.orderBy(arr, f)',
                '_.orderBy(arr, [f])'
            ].map(withDefaultPragma).map(fromOptions({options: [{method: 'orderBy'}]})),
            always: [
                '_.orderBy(arr, [f])',
                '_.orderBy(arr, ["name"])',
                '_.orderBy(arr, ["name"], ["desc"])'
            ].map(withDefaultPragma).map(fromOptions({options: [{method: 'orderBy', useArray: 'always'}]})),
            asNeeded: [
                '_.orderBy(arr, f)',
                '_.orderBy(arr, "name")',
                '_.orderBy(arr, "name", "desc")'
            ].map(withDefaultPragma).map(fromOptions({options: [{method: 'orderBy', useArray: 'as-needed'}]}))
        },
        orderByExplicit: {
            off: [
                '_.orderBy(arr, f, "asc")',
                '_.orderBy(arr, [f], ["asc"])'
            ].map(withDefaultPragma).map(fromOptions({options: [{method: 'orderByExplicit'}]})),
            always: [
                '_.orderBy(arr, [f], ["asc"])',
                '_.orderBy(arr, [f], ["desc"])',
                '_.orderBy(arr, [f, g], ["asc", "asc"])'
            ].map(withDefaultPragma).map(fromOptions({options: [{method: 'orderByExplicit', useArray: 'always'}]})),
            asNeeded: [
                '_.orderBy(arr, f, "asc")',
                '_.orderBy(arr, [f, g], ["asc", "asc"])'
            ].map(withDefaultPragma).map(fromOptions({options: [{method: 'orderByExplicit', useArray: 'as-needed'}]}))
        }
    },
    invalid: {
        sortBy: [
            '_.orderBy(arr, [f])',
            '_.orderBy(arr, ["name"])',
            '_.orderBy(arr, [f], ["asc"])',
            '_(arr).map(f).orderBy([g]).value()'
        ].map(withDefaultPragma).map(fromMessageId('sortBy')),
        orderBy: [
            '_.sortBy([f])'
        ].map(withDefaultPragma).map(fromMessageId('orderBy')).map(fromOptions({options: [{method: 'orderBy'}]})),
        omitOrders: [
            '_.orderBy(arr, [f], ["asc"])'
        ].map(withDefaultPragma).map(fromMessageId('omitOrders')).map(fromOptions({options: [{method: 'orderBy'}]})),
        orderByExplicit: [
            '_.sortBy(a, [f])',
            '_.orderBy(a, [f])'
        ].map(withDefaultPragma).map(fromMessageId('orderByExplicit')).map(fromOptions({options: [{method: 'orderByExplicit'}]})),
        useArrayAlways: [
            '_.sortBy(a, f)'
        ].map(withDefaultPragma).map(fromMessageId('useArrayAlways')).map(fromOptions({options: [{useArray: 'always'}]})),
        useArrayAsNeeded: [
            '_.sortBy(a, [f])'
        ].map(withDefaultPragma).map(fromMessageId('useArrayAsNeeded')).map(fromOptions({options: [{useArray: 'as-needed'}]}))
    }
}
ruleTester.run('collection-ordering', rule, {
    valid: [
        ...testCases.valid.sortBy.off,
        ...testCases.valid.sortBy.always,
        ...testCases.valid.sortBy.asNeeded,
        ...testCases.valid.orderBy.off,
        ...testCases.valid.orderBy.always,
        ...testCases.valid.orderBy.asNeeded,
        ...testCases.valid.orderByExplicit.off,
        ...testCases.valid.orderByExplicit.always,
        ...testCases.valid.orderByExplicit.asNeeded
    ],
    invalid: [
        ...testCases.invalid.sortBy,
        ...testCases.invalid.orderBy,
        ...testCases.invalid.omitOrders,
        ...testCases.invalid.orderByExplicit,
        ...testCases.invalid.useArrayAlways,
        ...testCases.invalid.useArrayAsNeeded
    ]
})
