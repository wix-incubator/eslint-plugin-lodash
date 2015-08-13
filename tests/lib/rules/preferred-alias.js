'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/preferred-alias');
var RuleTester = require('eslint').RuleTester;

//require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
//ruleTester.run('preferred-alias', rule, {
//
//    valid: [{
//        code: [
//            '_.forEach();'
//        ].join('\n')
//    }, {
//        code: [
//            'var x = 3;',
//            'var y = "";',
//            'x = _.map(y)'
//        ].join('\n')
//    }],
//
//    invalid: [{
//        code: [
//            '_.each();'
//        ].join('\n'),
//        errors: [{
//            message: "Method 'each' is an alias, for consistency prefer using 'forEach'"
//        }]
//    }
//    ]
//});

ruleTester.run('preferred-alias', rule, {

    valid: [],

    invalid: [{
        code: [
            'var x = 3;',
            'var y = "";',
            'x = _.each(y)'
        ].join('\n'),
        errors: [{
            message: "Method 'each' is an alias, for consistency prefer using 'forEach'"
        }]
    }]
});
