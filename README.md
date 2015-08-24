ESLint-plugin-lodash3
===================


Lodash3 specific linting rules for ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    npm install eslint

If you installed `ESLint` globally, you have to install lodash3 plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-lodash3

# Configuration

Add `plugins` section and specify ESLint-plugin-React as a plugin.

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
    "lodash3/unwrap": 1
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
* [unwrap](docs/rules/unwrap.md): Prevent chaining without evaluation via `value()` or non-chainable methods like `max()`.


# License

ESLint-plugin-lodash3 is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

