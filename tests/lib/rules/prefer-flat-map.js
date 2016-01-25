'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-flat-map');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.flatMap over consecutive map and flatten.'}];
ruleTester.run('prefer-flat-map', rule, {
    valid: [
        't = _.map(a, f);',
        't = _.flatMap(a, f);'
    ],
    invalid: [{
        code: '_(a).map(f).flatten().value',
        errors: errors
    }, {
        code: 't = _.flatten(_.map(a, f));',
        errors: errors
    }]
});
