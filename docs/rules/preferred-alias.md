# Preferred Alias

Some Lodash methods have one or more aliases, which can lead to inconsistent code and decrease readability. 

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
var ids = _.collect(users, 'id');
```

The following patterns are not considered warnings:

```js
var ids = _.map(users, 'id');
```


## When Not To Use It

If you do not want to enforce preferred alias, then you can disable this rule.
