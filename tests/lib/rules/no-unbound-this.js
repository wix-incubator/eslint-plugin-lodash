'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/no-unbound-this')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma} = require('../testUtil/optionsUtil')
const message = 'Do not use `this` without binding in collection methods'
ruleTester.run('no-unbound-this', rule, {
    valid: [
        'var y = _.map(x, function(t) {return this.f(t)}.bind(this))',
        'var y = _.map(x, t => this.f(t))',
        'var y = _.invokeMap(x, prop)',
        'var y = _.invokeMap(x, function () {this.f()})',
        'var y = _.map(x, prop)',
        'var y = _.map(x, function(t) { function f(i) {this.g(i)} return f.apply(z, t)})'
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var y = _.map(x, function (t) {return this.f(t)})',
        errors: [{message}]
    }, {
        code: 'var y = _.map(x, function (t) {return this.a + this.b})',
        errors: [{message}, {message}]
    }].map(withDefaultPragma)
})
