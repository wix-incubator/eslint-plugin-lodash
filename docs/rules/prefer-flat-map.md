# Prefer _.flatMap

When using _.map and _.flatten, it can be more concise to use _.flatMap instead

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
t = _.map(a, f);
        
t = _.flatMap(a, f);
```

The following patterns are not considered warnings:

```js

invalid: [{
_(a).map(f).flatten().value

t = _.flatten(_.map(a, f));
```


## When Not To Use It
##### This rule is only relevant for Lodash 4. If you don't use Lodash 4, you should not use this rule.
If you do not want to enforce using `_.flatMap`, and prefer `_.map` and `_.flatten` instead, you should not use this rule.
