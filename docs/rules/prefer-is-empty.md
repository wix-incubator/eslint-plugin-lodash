# Prefer _.isEmpty

When checking if a collection is empty or no, it is more concise to use _.isEmpty instead.

## Rule Details

This rule takes no arguments.

The following patterns are considered warnings:

```js
const myLengthEqualZero = myVar.length === 0;

const myLengthEqualZero = myVar.length > 0;

const myLengthEqualZero = myVar.length > 0 ? "first" : "second";

const myLengthEqualZero = myVar.myProp.mySecondProp.length === 0;

const myLengthEqualZero = myVar.myProp.mySecondProp.length > 0;
```

The following patterns are not considered warnings:

```js
const myLengthEqualZero = !isEmpty(myVar);

const myLengthEqualZero = isEmpty(myVar);

const myLengthEqualZero = myVar.length == 0;

const myLengthEqualZero = myVar.length;

const myLengthEqualZero = myVar;
```


## When Not To Use It
If you do not want to enforce using `_.isEmpty`, and prefer using native checks instead.