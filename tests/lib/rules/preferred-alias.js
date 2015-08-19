'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/preferred-alias');
var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('preferred-alias', rule, {
    valid: [{
        code: [
            '_.forEach();'
        ].join('\n')
    }, {
        code: [
            'var x = _.map(y, function (i) { return i; });'
        ].join('\n')
    }],
    invalid: [{
        code: [
            '_.each(users, function (i) { i.f(); });'
        ].join('\n'),
        errors: [{
            message: "Method 'each' is an alias, for consistency prefer using 'forEach'"
        }]
    }]
});
