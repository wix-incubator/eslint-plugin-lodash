ESLint-plugin-lodash3
===================

[![Maintenance Status][status-image]][status-url] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

Lodash3 specific linting rules for ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    npm install eslint

If you installed `ESLint` globally, you have to install lodash3 plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-lodash3

# Configuration

Add `plugins` section and specify ESLint-plugin-lodash3 as a plugin.

```json
{
  "plugins": ["lodash3"]
}
```


Finally, enable all of the rules that you would like to use.

```json
{
  "rules": {
    "lodash3/prop-shorthand": 1,
    "lodash3/matches-prop-shorthand": 1,
    "lodash3/prefer-chain": 1,
    "lodash3/preferred-alias": 1,
    "lodash3/no-single-chain": 1,
    "lodash3/prefer-reject": 1,
    "lodash3/prefer-filter": 1,
    "lodash3/no-unnecessary-bind": 1,
    "lodash3/unwrap": 1,
    "lodash3/prefer-compact": 1
    "lodash3/no-double-unwrap": 1
  }
}
```

# List of supported rules

* [prop-shorthand](docs/rules/prop-shorthand.md): Prefer property shorthand syntax
* [matches-prop-shorthand](docs/rules/matches-prop-shorthand.md): Prefer matches property shorthand syntax
* [preferred-alias](docs/rules/preferred-alias.md): Preferred aliases
* [prefer-chain](docs/rules/prefer-chain.md): Prefer chain over nested lodash calls
* [no-single-chain](docs/rules/no-single-chain.md): Prevent chaining syntax for single method, e.g. `_(x).map().value()`
* [prefer-reject](docs/rules/prefer-reject.md): Prefer `_.reject` over filter with `!(expression)` or `x.prop1 !== value`
* [prefer-filter](docs/rules/prefer-filter.md): Prefer `_.filter` over `_.forEach` with an `if` statement inside.
* [no-unnecessary-bind](docs/rules/no-unnecessary-bind.md): Prefer passing `thisArg` over binding.
* [unwrap](docs/rules/unwrap.md): Prevent chaining without evaluation via `value()` or non-chainable methods like `max()`.,
* [prefer-compact](docs/rules/prefer-compact.md): Prefer `_.compact` over `_.filter` for only truthy values.
* [no-double-unwrap](docs/rules/no-double-unwrap.md): Do not use `.value()` on chains that have already ended (e.g. with `max()` or `reduce()`)


# License

ESLint-plugin-lodash3 is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[npm-url]: https://npmjs.org/package/eslint-plugin-lodash3
[npm-image]: http://img.shields.io/npm/v/eslint-plugin-lodash3.svg?style=flat-square

[travis-url]: https://travis-ci.org/wix/eslint-plugin-lodash3
[travis-image]: http://img.shields.io/travis/wix/eslint-plugin-lodash3/master.svg?style=flat-square

[deps-url]: https://david-dm.org/wix/eslint-plugin-lodash3
[deps-image]: https://img.shields.io/david/dev/wix/eslint-plugin-lodash3.svg?style=flat-square

[coverage-url]: https://coveralls.io/r/wix/eslint-plugin-lodash3?branch=master
[coverage-image]: http://img.shields.io/coveralls/wix/eslint-plugin-lodash3/master.svg?style=flat-square

[climate-url]: https://codeclimate.com/github/wix/eslint-plugin-lodash3
[climate-image]: http://img.shields.io/codeclimate/github/wix/eslint-plugin-lodash3.svg?style=flat-square

[status-url]: https://github.com/wix/eslint-plugin-lodash3/pulse
[status-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square

