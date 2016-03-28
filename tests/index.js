/* eslint-env mocha */
'use strict';

var plugin = require('../src/index');

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var rules = fs.readdirSync(path.resolve(__dirname, '../src/rules/'))
    .map(f => path.basename(f, '.js'));

describe('all rule files should be exported by the plugin', function () {
    it('should export all rules', function () {
        rules.forEach(ruleName => {
            assert.equal(plugin.rules[ruleName], require(path.join('../src/rules', ruleName)), `rule ${ruleName} is not exported`);
        });
    });
    it('should export a config object for each version', function () {
        ['v3', 'recommended'].forEach(v => assert(plugin.configs[v], `version ${v} is not defined`));
    });
});
