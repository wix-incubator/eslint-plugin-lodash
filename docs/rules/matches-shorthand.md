# Matches shorthand

When using certain methods in Lodash such as filter, it is possible to use the `_.matches` callback shorthand. 
This rule will enforce using shorthand when possible to keep consistency in your code.

## Rule Details

This rule takes two arguments:

* The first, when to use the shorthand: `always` or `never` (default is `always`).
* The second is the maximum path length (default is 3).

The following patterns are considered warnings:

```js
/* eslint lodash3/matches-shorthand: [2, "always"] */
var result = _.filter(users, function (user) { return user.age === 30 && user.name === 'Bob'; });
```

```js
/* eslint lodash3/matches-shorthand: [2, "never"] */
var result = _.filter(users, {age: 30, name: 'Bob'}));
```
The following patterns are not considered warnings:

```js
/* eslint lodash3/matches-shorthand: [2, "never"] */
var result = _.filter(users, function (user) { return user.age === 30 && user.name === 'Bob'; });
```

```js
/* eslint lodash3/matches-shorthand: [2, "always"] */
var result = _.filter(users, {age: 30, name: 'Bob'}));
```


## When Not To Use It

If you do not want to enforce whether or not to use `_.matches` callback shorthand, then you can disable this rule.
