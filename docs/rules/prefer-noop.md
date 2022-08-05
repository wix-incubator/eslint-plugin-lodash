# Prefer noop

When defining an empty function (e.g. for callbacks) it can be more readable to use `_.noop` instead

## Options

This rule takes one argument, an object with one possible property - `ifContainsComment` (`ifContainsComment` default to false).

### ifContainsComment=false

When `ifContainsComment` is `false`, any empty function is prohibited.

The following patterns are considered warnings when `ifContainsComment=false`:
 
```js
const emptyFunction = ()=> {};

functionWithCallback(function(){
  // TODO: add error-handling
});
```

The following patterns are not considered warnings when `ifContainsComment=false`:

```js
const sqr = x => x * x;

functionWithCallback(function(x){
  // simple addition for now
  return x + 1
});
```

### ifContainsComment=true

When `ifContainsComment` is `true`, empty functions are prohibited, but functions that contain only a comment are not considered empty.

The following patterns are considered warnings when `ifContainsComment=true`:
 
```js
const emptyFunction = ()=> {};

functionWithCallback(function(){});
```

The following patterns are not considered warnings when `ifContainsComment=true`:

```js
const emptyFunction = ()=> {};

functionWithCallback(function(){
  // TODO: add error-handling
});
```

## When Not To Use It

If you do not want to enforce using `_.noop`, you should not use this rule.
