# No unnecessary bind

When passing a callback as predicate/iteratee you can pass another argument as the context (thisArg), which makes binding redundant.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
var r = _.filter(users, function (user) { 
    return user.age > this.age; 
}, this);
```

The following patterns are not considered warnings:

```js
var r = _.filter(users, function (user) { 
    return user.age > this.age; 
}.bind(this));
```


## When Not To Use It

If you do not want to enforce usage of thisArg argument, then you can disable this rule.
