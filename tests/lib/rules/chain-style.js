'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../src/rules/chain-style');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = {
    asNeeded: [{message: 'Unnecessary explicit chaining'}],
    implicit: [{message: 'Do not use explicit chaining'}],
    explicit: [{message: 'Do not use implicit chaining'}]
};

ruleTester.run('chain-style', rule, {
    valid: [
        '_(a).map(f).filter(g).value()',
        '_(a).map(f).join(" ")',
        '_.chain(a).map(f).first().assign(obj).value()',
        {code: '_(a).map(f).filter(g).value();', options: ['as-needed']},
        {code: '_(a).map(f).join(" ")', options: ['implicit']},
        {code: '_.chain(a).map(f).filter(b).value()', options: ['explicit']}
    ],
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
    }]
});
