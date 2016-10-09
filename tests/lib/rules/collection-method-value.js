 'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/collection-method-value')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('collection-method-value', rule, {
    valid: [
        'x = _.map(arr, f)',
        '_.forEach(arr, g)',
        'if (_.some(arr, h)) {i()}',
        'x = _(arr).filter(p).map(q).value()',
        '_(arr).filter(p).forEach(g)',
        {
            code: '_.remove(arr, f)', settings: {lodash: {version: 3}}
        }
    ].map(withDefaultPragma),
    invalid: [
        'x = _.forEach(arr, g)',
        'x = _(arr).map(f).forEach(g)',
        'x = _.chain(arr).map(f).forEach(g).value()'
    ].map(withDefaultPragma).map(fromMessage('Do not use value returned from _.forEach')).concat([
        '_.map(arr, f)',
        '_(arr).filter(g).map(f).value()',
        '_.chain(arr).find(p).map(f).value()',
        {
            code:'import f from "lodash/map"; f(x, g)',
            parserOptions: {
                sourceType: 'module'
            }
        }
    ].map(withDefaultPragma).map(fromMessage('Use value returned from _.map')))
})
