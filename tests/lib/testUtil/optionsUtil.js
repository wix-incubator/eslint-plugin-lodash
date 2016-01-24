'use strict';
var _ = require('lodash');

function fromMessage(message) {
    return fromOptions({errors: [{message: message}]});
}

function fromOptions(options) {
    return function (testCase) {
        return _.isString(testCase) ? _.assign({code: testCase}, options) : _.assign(testCase, options);
    };
}

module.exports = {
    fromMessage: fromMessage,
    fromVersion3: fromOptions({settings: {lodash: {version: 3}}}),
    fromOptions: fromOptions
};