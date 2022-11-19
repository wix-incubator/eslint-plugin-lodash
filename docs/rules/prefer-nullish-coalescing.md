# Prefer nullish coalescing over checking a ternary with !isNil.

When checking if a variable is not nil as a test for a ternary equation, it's more coincise to just use the nullish coalescing operator.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
const myExpression = !isNil(myVar) ? myVar : myOtherVar;
```

The following patterns are not considered warnings:

```js
const myExpression = !isNil(myVar) ? mySecondVar : myThirdVar;

const myExpression = myVar ?? myOtherVar;
```


## When Not To Use It
If you do not want to enforce using nullish coalescing.