# Matches property shorthand

When using certain methods in Lodash such as filter, it is possible to use the `_.matchesProperty` callback shorthand. 
This rule will enforce whether or not to use shorthand when possible to keep consistency in your code.

## Rule Details

This rule takes one argument, when to use the code: `always` or `never` (default is `always`).

The following patterns are considered warnings:

```js
/* eslint lodash3/matches-prop-shorthand: [2, "always"] */
var result = _.filter(users, function (i) { return i.id === 3; });
```

```js
/* eslint lodash3/matches-prop-shorthand: [2, "never"] */
var result = _.filter(users, 'id', 3);
```

The following patterns are not considered warnings:

```js
/* eslint lodash3/matches-prop-shorthand: [2, "always"] */
var result = _.filter(users, 'id', 3);
```

```js
/* eslint lodash3/matches-prop-shorthand: [2, "never"] */
var result = _.filter(users, function (i) { return i.id === 3; });
```


## When Not To Use It

If you do not want to enforce whether or not to use `_.matchesProperty` callback shorthand, then you can disable this rule.
