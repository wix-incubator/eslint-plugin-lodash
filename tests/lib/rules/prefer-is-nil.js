'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prefer-is-nil');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var toErrorObject = require('../testUtil/optionsUtil').fromMessage('Prefer isNil over checking for undefined or null.');
ruleTester.run('prefer-is-nil', rule, {
    valid: [
        'if (x === undefined) {}',
        'if (x === null) {}',
        'var t = _.isNil(x)',
        'var t = _.isUndefined(x)',
        'var t = _.isUndefined(x) || _.isNull(y)',
        'var t = !_.isNull(x) && !_.isNull(y)'
    ],
    invalid: [
        'var t = x === undefined || x === null',
        'var t = undefined === x || x === null',
        'var t = typeof x !== "undefined" && !_.isNull(x);',
        'var t = "undefined" !== typeof x && null !== x',
        'var t = _.isUndefined(x) || _.isNull(x)',
        'var t = !_.isNull(x) && !_.isUndefined(x)'
    ].map(toErrorObject)
});
