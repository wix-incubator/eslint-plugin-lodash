# Prefer reject

When using _.filter with a negative condition, it could improve readability by switching to _.reject

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js

_.filter(arr, function(x) { return x.a !== b});

_.filter(arr, function(x) {return !x.isSomething})
```

The following patterns are not considered warnings:

```js

var x = _.filter(arr, function(x) {return !x.a && p});

var x = _.filter(arr, function(x) {return !f(x)}; // The function f could take multiple arguments, e.g. parseInt 
```


## When Not To Use It

If you do not want to enforce using `_.reject`, you should not use this rule.
