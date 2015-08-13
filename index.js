'use strict';

module.exports = {
    rules: {
        'preferred-alias': require('./lib/rules/preferred-alias'),
        'prefer-chain': require('./lib/rules/prefer-chain'),
        'prop-shorthand': require('./lib/rules/prop-shorthand')
    },
    rulesConfig: {
        'preferred-alias': 0,
        'prefer-chain': 0,
        'prop-shorthand': 0
    }
};
