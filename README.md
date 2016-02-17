ESLint-Plugin-Lodash
===================

[![Maintenance Status][status-image]][status-url] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

Lodash-specific linting rules for ESLint.

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    $ npm install eslint

If you installed `ESLint` globally, you have to install the Lodash plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-lodash

# Configuration

Add `plugins` section and specify ESLint-Plugin-Lodash as a plugin.
You can additionally add settings for the plugin.

### Shared Rule Settings
These are settings that can be shared by all of the rules. All settings are under the `lodash` inside the general `settings` object. For more info about shared settings, read the [ESLint Configuration Guide](http://eslint.org/docs/user-guide/configuring#adding-shared-settings).

* __pragma__: specifies the name you use for the Lodash variable in your code. Default is `_`.
* __version__: specifies the major Lodash Version you are using (default is `4`).
If you wish to use this plugin with Lodash v3, change this value to 3.


Finally, enable all of the rules that you would like to use.
```json
{
  "plugins": ["lodash"],
  "rules": {
    "lodash/prop-shorthand": 2,
    "lodash/matches-shorthand": [2, "always", 3],
    "lodash/matches-prop-shorthand": [2, "always"],
    "lodash/prefer-chain": [2, 3],
    "lodash/preferred-alias": 2,
    "lodash/no-single-chain": 2,
    "lodash/prefer-reject": [2, 3],
    "lodash/prefer-filter": [2, 3],
    "lodash/callback-binding": 2,
    "lodash/unwrap": 2,
    "lodash/prefer-compact": 2,
    "lodash/no-double-unwrap": 2,
    "lodash/prefer-map": 2,
    "lodash/prefer-wrapper-method": 2,
    "lodash/prefer-invoke-map": 2,
    "lodash/prefer-thru": 2,
    "lodash/prefer-lodash-chain": 2,
    "lodash/prefer-lodash-method": 2,
    "lodash/prefer-lodash-typecheck": 2,
    "lodash/no-commit": 2,
    "lodash/prefer-get": [2, 3],
    "lodash/collection-return": 2,
    "lodash/prefer-matches": [2, 3],
    "lodash/prefer-times": 2,
    "lodash/prefer-startswith": 2,
    "lodash/prefer-noop": 2,
    "lodash/prefer-constant": 2,
    "lodash/chain-style": [2, "as-needed"],
    "lodash/prefer-is-nil": 2,
    "lodash/prefer-over-quantifier": 2,
    "lodash/path-style": [2, "as-needed"],
    "lodash/no-extra-args": 2
  }
}
```

## Configuration for Using with Lodash v3
Out of the box, this plugin supports the use of Lodash v4. To use with Lodash v3, the config needs to specify the version in the `settings`, and can't use some rules:
```json
{
  "settings": {
    "lodash": {
      "version": 3
    }
  },
  "rules": {
    "lodash/prop-shorthand": 2,
    "lodash/matches-shorthand": [2, "always", 3],
    "lodash/matches-prop-shorthand": [2, "always"],
    "lodash/prefer-chain": [2, 3],
    "lodash/preferred-alias": 2,
    "lodash/no-single-chain": 2,
    "lodash/prefer-reject": [2, 3],
    "lodash/prefer-filter": [2, 3],
    "lodash/callback-binding": 2,
    "lodash/unwrap": 2,
    "lodash/prefer-compact": 2,
    "lodash/no-double-unwrap": 2,
    "lodash/prefer-map": 2,
    "lodash/prefer-wrapper-method": 2,
    "lodash/prefer-thru": 2,
    "lodash/prefer-lodash-chain": 2,
    "lodash/prefer-lodash-method": 2,
    "lodash/prefer-lodash-typecheck": 2,
    "lodash/no-commit": 2,
    "lodash/prefer-get": [2, 3],
    "lodash/collection-return": 2,
    "lodash/prefer-matches": [2, 3],
    "lodash/prefer-times": 2,
    "lodash/prefer-startswith": 2,
    "lodash/prefer-noop": 2,
    "lodash/prefer-constant": 2,
    "lodash/chain-style": [2, "as-needed"],
    "lodash/path-style": [2, "as-needed"],
    "lodash/no-extra-args": 2
  }
}
```

# List of provided rules
Rules are divided into categories for your convenience. All rules are off by default.
### Possible Errors
The following rules point out areas where you might have made mistakes.

* [callback-binding](docs/rules/callback-binding.md): Use or avoid `thisArg` for Lodash method callbacks, depending on major version.
* [unwrap](docs/rules/unwrap.md): Prevent chaining without evaluation via `value()` or non-chainable methods like `max()`.,
* [no-double-unwrap](docs/rules/no-double-unwrap.md): Do not use `.value()` on chains that have already ended (e.g. with `max()` or `reduce()`)
* [collection-return](docs/rules/collection-return.md): Always return a value in iteratees of Lodash collection methods that aren't `forEach`.
* [no-extra-args](docs/rules/no-extra-args.md): Do not use superfluous arguments on Lodash methods with a specified arity.

### Stylistic Issues
These rules are purely matters of style and are quite subjective.
* [prop-shorthand](docs/rules/prop-shorthand.md): Use/forbid property shorthand syntax.
* [matches-prop-shorthand](docs/rules/matches-prop-shorthand.md): Prefer matches property shorthand syntax
* [matches-shorthand](docs/rules/matches-shorthand.md): Prefer matches shorthand syntax
* [preferred-alias](docs/rules/preferred-alias.md): Prefer using main method names instead of aliases
* [prefer-chain](docs/rules/prefer-chain.md): Prefer a Lodash chain over nested Lodash calls
* [no-single-chain](docs/rules/no-single-chain.md): Prevent chaining syntax for single method, e.g. `_(x).map().value()`
* [prefer-reject](docs/rules/prefer-reject.md): Prefer `_.reject` over filter with `!(expression)` or `x.prop1 !== value`
* [prefer-filter](docs/rules/prefer-filter.md): Prefer `_.filter` over `_.forEach` with an `if` statement inside.
* [prefer-compact](docs/rules/prefer-compact.md): Prefer `_.compact` over `_.filter` for only truthy values.
* [prefer-map](docs/rules/prefer-map.md): Prefer `_.map` over `_.forEach` with a `push` inside.
* [prefer-wrapper-method](docs/rules/prefer-wrapper-method.md): Prefer using array and string methods in the chain and not the initial value, e.g. `_(str).split(' ')...`
* [prefer-invoke-map](docs/rules/prefer-invoke-map.md): Prefer using `_.invoke` over `_.map` with a method call inside.
* [prefer-thru](docs/rules/prefer-thru.md): Prefer using `_.prototype.thru` in the chain and not call functions in the initial value, e.g. `_(x).thru(f).map(g)...`
* [no-commit](docs/rules/no-commit.md): Do not use `.commit()` on chains that should end with `.value()`
* [chain-style](docs/rules/chain-style.md): Enforce a specific chain style: explicit, implicit, or explicit only when necessary.
* [prefer-flat-map](docs/rules/prefer-flat-map.md) Prefer `_.flatMap` over consecutive `map` and `flatten`.
* [path-style](docs/rules/path-style.md) Enforce a specific path style for methods like `get` and `property`: array, string, or arrays only for deep paths.

#### Preference over native
These rules are also stylistic choices, but they also recommend using Lodash instead of native functions and constructs.
* [prefer-lodash-chain](docs/rules/prefer-lodash-chain.md): Prefer using Lodash chains (e.g. `_.map`) over native and mixed chains.
* [prefer-lodash-method](docs/rules/prefer-lodash-method.md): Prefer using Lodash collection methods (e.g. `_.map`) over native array methods.
* [prefer-lodash-typecheck](docs/rules/prefer-lodash-typecheck.md): Prefer using `_.is*` methods over `typeof` and `instanceof` checks when applicable.
* [prefer-get](docs/rules/prefer-get.md): Prefer using `_.get` or `_.has` over expression chains like `a && a.b && a.b.c`.
* [prefer-matches](docs/rules/prefer-matches.md): Prefer `_.matches` over conditions like `a.foo === 1 && a.bar === 2 && a.baz === 3`.
* [prefer-times](docs/rules/prefer-times.md): Prefer `_.times` over `_.map` without using the iteratee's arguments.
* [prefer-startswth](docs/rules/prefer-startswith.md): Prefer `_.startsWith` over `a.indexOf(b) === 0`.
* [prefer-noop](docs/rules/prefer-noop.md): Prefer `_.noop` over empty functions.
* [prefer-constant](docs/rules/prefer-constant.md): Prefer `_.constant` over functions returning literals.
* [prefer-is-nil](docs/rules/prefer-is-nil.md): Prefer `_.isNil` over checks for both null and undefined.
* [prefer-over-quantifier](docs/rules/prefer-over-quantifier.md) Prefer `_.overSome` and `_.overEvery` instead of checks with `&&` and `||` for methods that have a boolean check iteratee.

# Contributing
Contributions are always welcome! For more info, read our [contribution guide](/CONTRIBUTING.md).

# License

ESLint-plugin-lodash is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[npm-url]: https://npmjs.org/package/eslint-plugin-lodash
[npm-image]: http://img.shields.io/npm/v/eslint-plugin-lodash.svg?style=flat-square

[travis-url]: https://travis-ci.org/wix/eslint-plugin-lodash3
[travis-image]: http://img.shields.io/travis/wix/eslint-plugin-lodash3/master.svg?style=flat-square

[deps-url]: https://david-dm.org/wix/eslint-plugin-lodash
[deps-image]: https://img.shields.io/david/dev/wix/eslint-plugin-lodash.svg?style=flat-square

[coverage-url]: https://coveralls.io/r/wix/eslint-plugin-lodash?branch=master
[coverage-image]: http://img.shields.io/coveralls/wix/eslint-plugin-lodash/master.svg?style=flat-square

[status-url]: https://github.com/wix/eslint-plugin-lodash/pulse
[status-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square
