# Prefer Lodash method

When using native functions like forEach and map, it's often better to use the Lodash implementation.

## Rule Details

This rule takes one argument - an options object with exceptions.

For instance, if you do not wish to use `_.keys` but prefer `Object.keys`, the config would be:
```json
{
  "rules": {
    "lodash/prefer-lodash-method": [2, {"except": ["keys"]}]
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
