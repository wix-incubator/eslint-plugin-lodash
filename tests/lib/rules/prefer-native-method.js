'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/prefer-native-method')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {withDefaultPragma, fromVersion3WithDefaultPragma} = require('../testUtil/optionsUtil')
ruleTester.run('prefer-native-method', rule, {
    valid: [
        ...[
            '[1,2,3].map((i) => i)',
            'arr.map((i) => i)'
        ].map(withDefaultPragma),
        ...[
            'var x = arr.map(something, withSomething)'
        ].map(fromVersion3WithDefaultPragma)
    ],
    invalid: [{
        code: 'var x = _.map(arr, f)',
        errors: [{message: 'Prefer \'Array.prototype.map\' over the lodash function.'}],
        output: 'var x = arr.map(f)'
    }, {
        code: 'import {map} from "lodash"; var x = map(arr, f)',
        errors: [{message: 'Prefer \'Array.prototype.map\' over the lodash function.'}],
        output: 'import {map} from "lodash"; var x = arr.map(f)',
        parserOptions: {
            sourceType: 'module'
        }
    }, {
        code: 'var x = _.map(arr, (i) => i)',
        errors: [{message: 'Prefer \'Array.prototype.map\' over the lodash function.'}],
        output: 'var x = arr.map((i) => i)'
    }, {
        code: 'import {map as renamedMap} from "lodash"; var x = renamedMap(arr, (i) => i)',
        errors: [{message: 'Prefer \'Array.prototype.map\' over the lodash function.'}],
        output: 'import {map as renamedMap} from "lodash"; var x = arr.map((i) => i)',
        parserOptions: {
            sourceType: 'module'
        }
    }, {
        code: 'import {map as renamedMap} from "lodash"; var x = renamedMap(compact([1,2,3,null]), (i) => i)',
        errors: [{message: 'Prefer \'Array.prototype.map\' over the lodash function.'}],
        output: 'import {map as renamedMap} from "lodash"; var x = compact([1,2,3,null]).map((i) => i)',
        parserOptions: {
            sourceType: 'module'
        }
    }].map(withDefaultPragma)
})
