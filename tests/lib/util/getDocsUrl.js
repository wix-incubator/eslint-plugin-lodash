'use strict'

const assert = require('assert')
const pkg = require('../../../package')
const getDocsUrl = require('../../../src/util/getDocsUrl')

describe('getDocsUrl', () => {
    it('returns the URL of the a named rule\'s documentation', () => {
        const url = `https://github.com/wix/eslint-plugin-lodash/blob/v${pkg.version}/docs/rules/foo.md`
        assert.strictEqual(getDocsUrl('foo'), url)
    })
})
