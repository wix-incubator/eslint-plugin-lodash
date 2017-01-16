# Import Scope

There are several ways to import Lodash methods: From single method files, as single members of the object, or as the full Lodash object.

For example:

| Import Syntax | Single Method                       | Destructured Members              | Full Import                   |
|---------------|-------------------------------------|-----------------------------------|-------------------------------|
| CommonJS      | `const map = require('lodash/map')` | `const {map} = require('lodash')` | `const _ = require('lodash')` |
| ES6 Modules   | `import map from 'lodash/map'`      | `import {map} from 'lodash'`      | `import _ from 'lodash'`      |


## Rule Details

This rule takes one argument - the preferred import scope (default is `method`): 
* `method` for single method imports, 
* `member` for destructured members
* `full` for the full Lodash object 

The following patterns are considered warnings:

```js
/*eslint lodash/import-scope: [2, "method"]*/

import _ from 'lodash' //Do not import from the full Lodash module.

import {map} from 'lodash' //Do not import from the full Lodash module.

```

```js
/*eslint lodash/import-scope: [2, "member"]*/

import _ from 'lodash' //Import members from the full Lodash module.

import map from 'lodash/map' //Import members from the full Lodash module.

```

```js
/*eslint lodash/import-scope: [2, "full"]*/

import map from 'lodash/map' //Use the full Lodash module

import {map} from 'lodash' //Use the full Lodash module

```

The following patterns are not considered warnings:

```js
/*eslint lodash/import-scope: [2, "method"]*/

import map from 'lodash/map'

```

```js
/*eslint lodash/import-scope: [2, "member"]*/

import {map} from 'lodash'

import {filter as f} from 'lodash'

```

```js
/*eslint lodash/import-scope: [2, "full"]*/

import _ from 'lodash'

```

## When Not To Use It

If you do not want to enforce a specific import scope in your code, then you can disable this rule.
