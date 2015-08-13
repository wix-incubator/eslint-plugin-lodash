# Matches property shorthand

When using certain method in lodash such as filter, code can be shorter and more readable when using the `_.matchesProperty` callback shorthand. This rule will enforce using shorthand when possible to keep consistency in your code.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
var result = _.filter(users, function (i) { return i.id === 3; });
```

The following patterns are not considered warnings:

```js
var result = _.filter(users, 'id', 3);
```


## When Not To Use It

If you do not want to enforce `_.matchesProperty` callback shorthand, then you can disable this rule.
