'use strict';

function fromMessage(message) {
    return function (code) {
        return {code: code, errors: [{message: message}]};
    };
}

module.exports = {
    fromMessage: fromMessage
};