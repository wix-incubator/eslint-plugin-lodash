/* eslint-env mocha */
'use strict'

const plugin = require('../src/index')

const assert = require('assert')
const fs = require('fs')
const path = require('path')

const rules = fs.readdirSync(path.resolve(__dirname, '../src/rules/'))
    .map(f => path.basename(f, '.js'))

describe('all rule files should be exported by the plugin', () => {
    it('should export all rules', () => {
        rules.forEach(ruleName => {
            assert.equal(plugin.rules[ruleName], require(path.join('../src/rules', ruleName)), `rule ${ruleName} is not exported`)
        })
    })
    it('should export a config object for each version', () => {
        ['v3', 'recommended'].forEach(v => assert(plugin.configs[v], `version ${v} is not defined`))
    })
})
