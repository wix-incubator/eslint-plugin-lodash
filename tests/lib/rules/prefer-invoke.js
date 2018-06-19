'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-invoke')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()

const {withDefaultPragma} = require('../testUtil/optionsUtil')
const errorMessage = 'Prefer _.invoke(f) over _.isFunction(f) && f()'
ruleTester.run('prefer-invoke', rule, {
    valid: [
        {code: 'if (_.otherFunc(obj.foo)) {obj.foo(a, b, c)}', errors: [errorMessage]},
        {code: 'if(_.isFunction(x.a)) {  y.a()}', errors: [errorMessage]},
        {code: "_.invoke(obj, 'foo', a, b, c)"}, 
        {code: "if (!_.isFunction(obj.foo)) {   throw new Error('foo is not a function')}"}, 
        {code: "if(_.isFunction(obj.foo)) {obj.foo();console.log('calling foo')}"}, 
        {code: "if(shouldRender) {_.invoke(obj, 'render');}"}, 
        {code: 'if (_.isFunction(f) && someHeavyCalculationThatTakesAWhile(...someArguments)) {f()}'} 

    ].map(withDefaultPragma),
    invalid: [
        {code: "if (_.get(x, 'a')) {  x();}", errors: [errorMessage]}, 
        {code: "if (_.has(x, 'a')) {  x();}", errors: [errorMessage]}, 
        {code: 'if (_.isFunction(x))   x()', errors: [errorMessage]},
        {code: 'if (_.isFunction(obj.foo)) {obj.foo(a, b, c)}', errors: [errorMessage]},
        {code: "var f = () => console.log('i am a function');if(_.isFunction(f)){f()}", errors: [errorMessage]},
        {code: 'if(shouldRender && _.isFunction(obj.render)) {obj.render()}', errors: [errorMessage]}, 
        {code: "if(shouldRender && _.get(obj, 'render')) {obj.render()}", errors: [errorMessage]}, 
        {code: "if(shouldRender && _.has(obj, 'render')) {obj.render()}", errors: [errorMessage]}, 
        {code: 'if (shouldRender && !shouldSkip && _.isFunction(f)) {f();}', errors: [errorMessage]} 
    ].map(withDefaultPragma)
})
