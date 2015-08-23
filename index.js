'use strict';

module.exports = {
    rules: {
        'preferred-alias': require('./lib/rules/preferred-alias'),
        'prefer-chain': require('./lib/rules/prefer-chain'),
        'prop-shorthand': require('./lib/rules/prop-shorthand'),
        'matches-prop-shorthand': require('./lib/rules/matches-prop-shorthand'),
        'no-single-chain': require('./lib/rules/no-single-chain'),
        'prefer-reject': require('./lib/rules/prefer-reject')
    },
    rulesConfig: {
        'preferred-alias': 0,
        'prefer-chain': 0,
        'prop-shorthand': 0,
        'matches-prop-shorthand': 0,
        'no-single-chain': 0,
        'prefer-reject': 0
    }
};
