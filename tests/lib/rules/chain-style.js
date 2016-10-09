'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/chain-style')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const errors = {
    asNeeded: [{message: 'Unnecessary explicit chaining'}],
    implicit: [{message: 'Do not use explicit chaining'}],
    explicit: [{message: 'Do not use implicit chaining'}]
}
const {withDefaultPragma} = require('../testUtil/optionsUtil')

ruleTester.run('chain-style', rule, {
    valid: [
        '_(a).map(f).filter(g).value()',
        '_(a).map(f).join(" ")',
        '_.chain(a).map(f).first().assign(obj).value()',
        {code: '_(a).map(f).filter(g).value();', options: ['as-needed']},
        {code: '_(a).map(f).join(" ")', options: ['implicit']},
        {code: '_.chain(a).map(f).filter(b).value()', options: ['explicit']}
    ].map(withDefaultPragma),
    invalid: [{
        code: '_.chain(a).map(f).filter(g).value()',
        errors: errors.asNeeded
    }, {
        code: '_.chain(a).map(f).max(g).value()',
        errors: errors.asNeeded
    }, {
        code: '_.chain(a).map(f).filter(g).value()',
        errors: errors.asNeeded,
        options: ['as-needed']
    }, {
        code: '_(a).map(f).max(g)',
        errors: errors.explicit,
        options: ['explicit']
    }, {
        code: '_.chain(a).map(f).max(g).assign(obj).value()',
        errors: errors.implicit,
        options: ['implicit']
    }, {
        code: '_.chain(a).map(f).max(g).value()',
        errors: errors.implicit,
        options: ['implicit']
    }, {
        code: 'lo.chain(a).map(f).filter(g).value()',
        errors: errors.asNeeded,
        settings: {lodash: {pragma: 'lo'}}
    }].map(withDefaultPragma)
})
