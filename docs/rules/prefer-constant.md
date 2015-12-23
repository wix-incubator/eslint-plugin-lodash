# Prefer constant

When you want a function that always returns the same value, it can be more concise to use `_.constant`.

## Rule Details

This rule takes one argument: whether or not to check arrow functions.

The following patterns are considered warnings:

```js

var three = function() { return 3;}

//When including arrow functions:
var pi = () => 3.1415;

```

The following patterns are not considered warnings:

```js

var identity = function(x) {return x;}

var getObj = function() { return {a: 1}; }
 
```

The last example is not a warning because it is not equivalent to `_.constant({a:1})`, which always returns the same instance.
Consider:

```js
var getObj = _.constant({a:1});
x = getObj();
x.a = 2;
console.log(getObj()) // ==> {a:2}
```

## When Not To Use It

If you do not want to enforce using `_.constant`, you should not use this rule.
