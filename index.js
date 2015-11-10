'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var rules = fs.readdirSync(path.resolve(__dirname, 'lib', 'rules')).map(function (f) {
    return f.replace(/\.js$/, '');
});

module.exports = {
    rules: _.zipObject(rules, rules.map(function (rule) {
        return require('./lib/rules/' + rule);
    })),
    rulesConfig: _.zipObject(rules, _.times(rules.length, _.constant(0)))
};
