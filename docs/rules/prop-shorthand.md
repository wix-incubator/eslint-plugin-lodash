# Property shorthand

When using certain method in lodash such as map, code can be shorter and more readable when using the `_.property` callback shorthand. This rule will enforce using shorthand when possible to keep consistency in your code.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
var ids = _.map([], function (i) { return i.id; });
```

The following patterns are not considered warnings:

```js
var ids = _.map([], 'id');
```


## When Not To Use It

If you do not want to enforce `_.property` callback shorthand, then you can disable this rule.
