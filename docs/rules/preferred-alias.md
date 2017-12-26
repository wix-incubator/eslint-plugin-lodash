# Preferred Alias

Some Lodash methods have one or more aliases, which can lead to inconsistent code and decrease readability. 

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
_.each(users, f);
```

The following patterns are not considered warnings:

```js
_.forEach(users, f);
```


## When Not To Use It

If you do not want to enforce preferred alias, then you can disable this rule.
