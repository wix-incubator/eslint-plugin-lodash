# Prefer invoke

In many places there are usages of _.isFunction before running a certain function. _.invoke does exactly that. The rule will prefer using _.invoke instead of checking if something is a function before executing it

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js

if (_.isFunction(obj.foo)) {
    obj.foo(a, b, c);
}


if (_.isFunction(obj.foo)) {
    obj.foo(a, b, c);
}


// This is bad.
if (_.isFunction(f)) {
    f();
}


if (shouldRender && _.isFunction(obj.render)) {
    obj.render();
}


if (shouldRender && !shouldSkip && _.isFunction(f)) {
    f();
}


```

The following patterns are not considered warnings:

```js
_.invoke(obj, 'foo', a, b, c);

if (!_.isFunction(obj.foo)) {
    throw new Error('foo is not a function');
}


if (_.isFunction(obj.foo)) {
    console.log('calling foo');
    obj.foo();
}

if (shouldRender) {
    _.invoke(obj, 'render');
}

if (_.isFunction(f) && someHeavyCalculationThatTakesAWhile(...someArguments)) {
    f();
}



```


## When Not To Use It
##### This rule is only relevant for Lodash 4. If you don't use Lodash 4, you should not use this rule.
