# Prefer filter

When using _.forEach with a single `if` statement, you should probably use `_.filter` or `_.some` instead.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js

_(arr).forEach(function(x) { 
  if (x.a) {
  // ...
  }
});

  if (!x.a) {
  // ...
  }
});

_.forEach(arr, function(x) { 
  if (x.a === b) {
  // ...
  }
});
```

The following patterns are not considered warnings:

```js

var x = _.filter(arr, function(x) {return !x.a && p});

```
