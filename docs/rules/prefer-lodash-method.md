# Prefer Lodash method

When using native functions like forEach and map, it's often better to use the Lodash implementation.

This can be for performance reasons, for implicit care of edge cases (e.g. `_.map` over a variable that might be undefined), or for use of Lodash's shorthands.

## Rule Details

This rule takes one argument - an optional options object. This object can have two keys: `except` and `ignoreObjects`, both optional.

- `except` contains an array of methods that should not be reported on.
- `ignoreObjects` contains an array of objects that should not be reported on.
- `ignorePatterns` contains an array of regular expressions for objects that should not be reported on

For instance, if you do not wish to use `_.keys` but prefer `Object.keys`, the config would be:
```json
{
  "rules": {
    "lodash/prefer-lodash-method": [2, {"except": ["keys"]}]
  }
}
```
If you do not with the rule to work on any object named `fp`:
```js
{
  "rules": {
    "lodash/prefer-lodash-method": [2, {"ignoreObjects": ["fp"]}]
  }
}
```
And if you don't want the rule to work on any object starting with `$`:
```js
{
  "rules": {
    "lodash/prefer-lodash-method": [2, {"ignorePatterns": ["^\$[a-zA-Z0-9\_]+"]}]
  }
}
```
The following patterns are considered warnings:

```js

var b = a.map(f);

if (arr.some(f)) {
  // ...
}

```

The following patterns are not considered warnings:

```js

_.map(a, f);

 _(arr).map(f).reduce(g);

```


## When Not To Use It

If you do not want to enforce using Lodash methods, you should not use this rule.
