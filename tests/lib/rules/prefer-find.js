'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-find')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const { fromMessage, withDefaultPragma } = require('../testUtil/optionsUtil')
const toFindError = fromMessage('Prefer using `_.find` over selecting the first item of a filtered result')
const toFindLastError = fromMessage('Prefer using `_.findLast` over selecting the last item of a filtered result')

ruleTester.run('prefer-find', rule, {
    valid: [
        't = _.filter(arr, f)',
        't = _.find(arr, f)',
        't = _.reject(arr, f)',
        't = _.head(arr)',
        't = _.filter(arr, f)[2]'
    ].map(withDefaultPragma),
    invalid: [
        ...[
            ...[
                't = _.filter(arr, f)[0]',
                't = _.head(_.filter(arr, f))',
                't = _(arr).filter(f).head()'
            ].map(toFindError),
            ...[
                't = _.last(_.filter(arr, f))',
                't = _(arr).filter(f).last()'
            ].map(toFindLastError)
        ].map(withDefaultPragma),
        toFindError({
            code: 'import first from "lodash/first"; import filter from "lodash/filter"; const x = first(filter(x, f))',
            parserOptions: {
                sourceType: 'module'
            }
        })
    ]
})
