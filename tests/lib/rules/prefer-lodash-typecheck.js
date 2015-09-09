'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-lodash-typecheck');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = {
    typeof: [{message: 'Prefer \'_.isNumber\' over \'typeof\' comparison.'}],
    instanceof: [{message: 'Prefer \'_.isArray\' over \'instanceof Array\'.'}]
};
ruleTester.run('prefer-lodash-typecheck', rule, {
    valid: [{
        code: 'var x = a instanceof B'
    }, {
        code: 'var x = a > b ? a : b'
    }, {
        code: 'var x = typeof a === typeof b'
    }],
    invalid: [{
        code: 'var x = typeof a === "number"',
        errors: errors.typeof
    }, {
        code: 'var x = "number" !== typeof a',
        errors: errors.typeof
    }, {
        code: 'var x = a instanceof Array',
        errors: errors.instanceof
    }]
});
