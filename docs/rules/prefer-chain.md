# Prefer chaining

When using multiple calls to lodash methods, the resulting code is more readable when using chaining.

## Rule Details

This rule takes one argument, the depth (default is 3).

The following patterns are considered warnings, when depth is 2:

```js
var visibleIds = _.map(_.filter(users, 'visible'), 'id');
```

The following patterns are not considered warnings:

```js
var visibleIds = _(users)
    .filter('visible')
    .map('id')
    .value();
```


## When Not To Use It

If you do not want to enforce chaining, then you can disable this rule.
