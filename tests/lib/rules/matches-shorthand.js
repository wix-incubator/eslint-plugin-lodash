'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/matches-shorthand')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const messages = {
    always: 'Prefer matches syntax',
    never: 'Do not use matches syntax'
}

const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('matches-shorthand', rule, {
    valid: [
        'var isPublic = _.find([], function (i) { return x.id; });',
        'var r = _.findIndex(this.packages, {name: name});',
        'var isPublic = _.map([], function (i) { return i.id + "?"; });',
        'lang.fonts = _.filter(lang.fonts, function (font) { return font.permissions !== "legacy"});',
        'var isPublic = _.findLastIndex([], function (i) { return i.id == 3 && f(i); });',
        {
            code: 'var isPublic = _.find([], function(i) { return i.id === 3});',
            options: ['never']
        }, {
          code: 'var b = 1; var isPublic = _.find([], function(i) { return i.id === 3 && i.a === b; });',
          options: ['always', 1, true, { onlyLiterals: true }]
        }
    ].map(withDefaultPragma),
    invalid: [{
        code: 'var isPublic = _.find([], function (i) { return i.id === id; });',
        errors: [{message: messages.always, column: 27}]
    }, {
        code: 'var isPublic = _.find([], function (i) { return id === i.id; });',
        errors: [{message: messages.always, column: 27}]
    }, {
        code: 'var isPublic = _.find([], function (i) { return i.id === 3 && i.a === "string" && {a: 10} === i.b;});',
        errors: [{message: messages.always, column: 27}]
    }, {
        code: 'var isPublic = _.find([], _.matches({id: id}));',
        errors: [{message: messages.always, column: 27}]
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3 && i.name === name)',
        errors: [{message: messages.always, column: 30}]
    }, {
        code: 'var isPublic = _.findIndex(arr, (i) => {return i.id === id})',
        errors: [{message: messages.always, column: 33}]
    }, {
        code: 'var isPublic = _.some(arr, (i) => {return i.id === 3 && i.a === "string" && {a: 10} === i.b})',
        errors: [{message: messages.always, column: 28}]
    }, {
        code: '_.findLastIndex(arr, function(i) { return i[b].c === compId && i[b].d === x});',
        options: ['always', 3, true],
        errors: [{message: messages.always, column: 22}]
    }, {
        code: '_.findLastIndex(arr, {b: {c: compId}});',
        options: ['never'],
        errors: [{message: messages.never, column: 22}]
    }, {
      code: 'var isPublic = _.find([], function(i) { return i.id === 3 && i.a === "b"; });',
      options: ['always', 1, true, { onlyLiterals: true }],
      errors: [{message: messages.always, column: 27}]
    }].map(withDefaultPragma)
})
