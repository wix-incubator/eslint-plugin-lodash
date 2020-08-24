'use strict'
const {RuleTester} = require('eslint')

module.exports = {
    /**
     * Gets a rule tester configured for ecmaVersion 6
     * @param {Object?} options
     * @returns {*}
     */
    getRuleTester(options) {
        return new RuleTester(Object.assign({
            parserOptions: {
                ecmaVersion: 6
            }
        }, options || {}))
    }
}
