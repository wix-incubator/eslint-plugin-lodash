'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../src/rules/import-scope')
const ruleTesterUtil = require('../testUtil/ruleTesterUtil')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = ruleTesterUtil.getRuleTester()
const {fromMessage, fromOptions} = require('../testUtil/optionsUtil')

const messages = {
    method: 'Import individual methods from the Lodash module.',
    member: 'Import members from the full Lodash module.',
    full: 'Use the full Lodash module.',
    'method-package': 'Import Lodash methods only from method packages (e.g. lodash.map)'
}

const withOption = option => fromOptions({options: [option]})
const withOptionAndMessage = option => fromOptions({options: [option], errors: [{message: messages[option]}]})
const fromModule = fromOptions({parserOptions: {sourceType: 'module'}})

const testCases = {
    valid: {
        method: {
            require: [
                "const map = require('lodash/map')",
                "const someOtherModule = require('some-other-module')",
                "const fpMap = require('lodash/fp/map')",
                "const fp = require('lodash/fp')",
                "const {map} = require('lodash/fp')"
            ],
            import: [
                "import map from 'lodash/map'",
                "import someOtherModule from 'some-other-module'",
                "import fpMap from 'lodash/fp/map'",
                "import fp from 'lodash/fp'",
                "import {map} from 'lodash/fp'",
                "import {map as fpMap} from 'lodash/fp'"
            ].map(fromModule)
        },
        member: {
            require: [
                "const {map} = require('lodash')",
                "const {map: m} = require('lodash')",
                "const someOtherModule = require('some-other-module')",
                "const fpMap = require('lodash/fp/map')",
                "const fp = require('lodash/fp')",
                "const {map} = require('lodash/fp')"
            ],
            import: [
                "import {map} from 'lodash'",
                "import {map as m} from 'lodash'",
                "import someOtherModule from 'some-other-module'",
                "import fpMap from 'lodash/fp/map'",
                "import fp from 'lodash/fp'",
                "import {map} from 'lodash/fp'",
                "import {map as fpMap} from 'lodash/fp'"
            ].map(fromModule)
        },
        full: {
            require: [
                "const _ = require('lodash')",
                "const {someMember} = require('some-other-module')",
                "const fpMap = require('lodash/fp/map')",
                "const fp = require('lodash/fp')",
                "const {map} = require('lodash/fp')"
            ],
            import: [
                "import _ from 'lodash'",
                "import * as _ from 'lodash'",
                "import {someMember} from 'some-other-module'",
                "import fpMap from 'lodash/fp/map'",
                "import fp from 'lodash/fp'",
                "import {map} from 'lodash/fp'",
                "import {map as fpMap} from 'lodash/fp'"
            ].map(fromModule)
        },
        'method-package': {
            require: [
                "const map = require('lodash.map')",
                "const someOtherModule = require('some-other-module')",
                "const fpMap = require('lodash/fp/map')",
                "const fp = require('lodash/fp')",
                "const {map} = require('lodash/fp')"
            ],
            import: [
                "import map from 'lodash.map'",
                "import someOtherModule from 'some-other-module'",
                "import fpMap from 'lodash/fp/map'",
                "import fp from 'lodash/fp'",
                "import {map} from 'lodash/fp'",
                "import {map as fpMap} from 'lodash/fp'"
            ].map(fromModule)
        }
    },
    invalid: {
        method: {
            require: [
                "const _ = require('lodash')",
                "const {map} = require('lodash')",
                "const map = require('lodash.map')"
            ],
            import: [
                "import _ from 'lodash'",
                "import {map} from 'lodash'",
                "import * as _ from 'lodash'",
                "import map from 'lodash.map'"
            ].map(fromModule)
        },
        member: {
            require: [
                "const _ = require('lodash')",
                "const map = require('lodash/map')",
                "const map = require('lodash.map')"
            ],
            import: [
                "import _ from 'lodash'",
                "import map from 'lodash/map'",
                "import map from 'lodash.map'"
            ].map(fromModule)
        },
        full: {
            require: [
                "const map = require('lodash/map')",
                "const {map} = require('lodash')",
                "const map = require('lodash.map')"
            ],
            import: [
                "import map from 'lodash/map'",
                "import {map} from 'lodash'",
                "import map from 'lodash.map'"
            ].map(fromModule)
        },
        'method-package': {
            require: [
                "const _ = require('lodash')",
                "const {map} = require('lodash')",
                "const map = require('lodash/map')"
            ],
            import: [
                "import _ from 'lodash'",
                "import {map} from 'lodash'",
                "import * as _ from 'lodash'",
                "import map from 'lodash/map'"
            ].map(fromModule)
        },
    }
}
ruleTester.run('import-scope', rule, {
    valid: [
        ...testCases.valid.method.require,
        ...testCases.valid.method.import,
        ...[
            ...testCases.valid.member.require,
            ...testCases.valid.member.import
        ].map(withOption('member')),
        ...[
            ...testCases.valid.full.require,
            ...testCases.valid.full.import
        ].map(withOption('full')),
        ...[
          ...testCases.valid['method-package'].require,
          ...testCases.valid['method-package'].import
        ].map(withOption('method-package'))
    ],
    invalid: [
        ...[
            ...testCases.invalid.method.require,
            ...testCases.invalid.method.import
        ].map(fromMessage(messages.method)),
        ...[
            ...testCases.invalid.member.require,
            ...testCases.invalid.member.import
        ].map(withOptionAndMessage('member')),
        ...[
            ...testCases.invalid.full.require,
            ...testCases.invalid.full.import
        ].map(withOptionAndMessage('full')),
        ...[
          ...testCases.invalid['method-package'].require,
          ...testCases.invalid['method-package'].import
        ].map(withOptionAndMessage('method-package'))
    ]
})
