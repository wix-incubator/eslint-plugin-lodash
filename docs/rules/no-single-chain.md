# No Single Chain

This rule prevents unnecessary use of the lodash wrapper, when the chaining is only one method long.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
var x = _(arr).map(f).value();
var x = _(arr).reduce(f, i);
```

The following patterns are not considered warnings:

```js
var x = _.map(arr, f);
var x = _(arr).map(f).reduce(g, i).value();
```
