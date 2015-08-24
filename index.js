'use strict';

module.exports = {
    rules: {
        'preferred-alias': require('./lib/rules/preferred-alias'),
        'prefer-chain': require('./lib/rules/prefer-chain'),
        'prop-shorthand': require('./lib/rules/prop-shorthand'),
        'matches-prop-shorthand': require('./lib/rules/matches-prop-shorthand'),
        'no-single-chain': require('./lib/rules/no-single-chain'),
        'prefer-reject': require('./lib/rules/prefer-reject'),
        'prefer-filter': require('./lib/rules/prefer-filter'),
        'no-unnecessary-bind': require('./lib/rules/no-unnecessary-bind'),
        unwrap: require('./lib/rules/unwrap'),
        'prefer-compact': ('./lib/rules/prefer-compact')
    },
    rulesConfig: {
        'preferred-alias': 0,
        'prefer-chain': 0,
        'prop-shorthand': 0,
        'matches-prop-shorthand': 0,
        'no-single-chain': 0,
        'prefer-reject': 0,
        'prefer-filter': 0,
        'no-unnecessary-bind': 0,
        unwrap: 0,
        'prefer-compact': 1
    }
};
