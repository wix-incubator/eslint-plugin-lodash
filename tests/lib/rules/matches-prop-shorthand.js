'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const _ = require('lodash')
const rule = require('../../../src/rules/matches-prop-shorthand')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')
const {methodSupportsShorthand, getIterateeIndex} = require('../../../src/util/methodDataUtil')

const getMethodData = version => require(`../../../src/util/methodDataByVersion/${version}`)

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const errors = {
    always: [{message: 'Prefer matches property syntax'}],
    never: [{message: 'Do not use matches property syntax'}]
}

const methodsThatSupportShorthand = _([3, 4])
    .map(version =>
        _(getMethodData(version))
            .map((data, method) => ({method, version, iterateeIndex: getIterateeIndex(version, method)}))
            .filter(({method}) => methodSupportsShorthand(version, method))
            .value()
    )
    .flatten()
    .value()

const getExampleCodeWithPropShorthand = ({version, method, iterateeIndex}) => {
    switch (version) {
        case 3:
            switch (iterateeIndex) {
                case 1:
                    return `var isPublic = _.${method}(arr, "id", 3);`
                case 2:
                    return `var isPublic = _.${method}(arr, foo, "id", 3);`
                case 3:
                    return `var isPublic = _.${method}(arr, foo, bar, "id", 3);`
                default:
                    throw new Error(`${iterateeIndex} for ${method} not supported`)
            }
        case 4:
            switch (iterateeIndex) {
                case 1:
                    return `var isPublic = _.${method}(arr, ["id", 3]);`
                case 2:
                    return `var isPublic = _.${method}(arr, foo, ["id", 3]);`
                case 3:
                    return `var isPublic = _.${method}(arr, foo, bar, ["id", 3]);`
                default:
                    throw new Error(`${iterateeIndex} for ${method} not supported`)
            }
        default:
            throw new Error(`version ${version} not supported`)
    }
}

const {withDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('matches-prop-shorthand', rule, {
    valid: [
        'var isPublic = _.find([], function (i) { return x.id; });',
        'var r = _.findIndex(this.packages, {name: name});',
        'lang.fonts = _.filter(lang.fonts, function (font) { return font.permissions !== "legacy"});',
        'var isPublic = _.findLastIndex([], function (i) { return i.id == 3; });',
        'var different = _.reject(A, x => x.a === x.b)',
        {
            code: 'var isPublic = _.find([], function(i) { return i.id === 3});',
            options: ['never']
        }, {
            code: 'var isPublic = _.findIndex(arr, (i) => {return i.id === b.id})',
            options: ['always', {onlyLiterals: true}]
        }
    ].map(withDefaultPragma).concat([{
        code: 'import {map} from "lodash"; function foo() {map(bar, function(x) { return x})}',
        parserOptions: {
            ecmaVersion: 6,
            sourceType: 'module'
        }
    }]),
    invalid: methodsThatSupportShorthand.map(({version, method, iterateeIndex}) => ({
        code: getExampleCodeWithPropShorthand({version, method, iterateeIndex}),
        options: ['never'],
        errors: errors.never,
        settings: {
            lodash: {version}
        }
    })).concat([{
        code: 'var isPublic = _.find([], function (i) { return i.id === 3; });',
        errors: errors.always
    }, {
        code: 'var isPublic = _.find([], _.matchesProperty("id", 3));',
        errors: errors.always
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3)',
        errors: errors.always
    }, {
        code: 'var isPublic = _.find([], i => i[0] === 3);',
        errors: errors.always
    }, {
        code: 'var isPublic = _.findIndex(arr, (i) => {return i.id === b.id})',
        errors: errors.always
    }, {
        code: 'var isPublic = _.filter(arr, i => i.id === 3)',
        options: ['always', {onlyLiterals: true}],
        errors: errors.always
    }]).map(withDefaultPragma)
})
