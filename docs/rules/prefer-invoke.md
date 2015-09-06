# Prefer invoke

When using `_.map` with a method call of each item in the collection, it could improve readability by switching to `_.invoke`

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js

_.map(arr, function(x) { return x.f(a, b)});

_(arr).filter(f).map(function(x) { return x.f()}).value();
```

The following patterns are not considered warnings:

```js

var x = _.invoke(arr, 'f');

var x = _.invoke(collection, 'split', ':'); 
```


## When Not To Use It

If you do not want to enforce using `_.invoke`, and prefer using `_.map` with a method call instead.
