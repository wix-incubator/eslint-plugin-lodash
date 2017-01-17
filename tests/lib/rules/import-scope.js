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
    method: 'Do not import from the full Lodash module.',
    member: 'Import members from the full Lodash module.',
    full: 'Use the full Lodash module.'
}

const withOption = option => fromOptions({options: [option]})
const withOptionAndMessage = option => fromOptions({options: [option], errors: [{message: messages[option]}]})
const fromModule = fromOptions({parserOptions: {sourceType: 'module'}})

const testCases = {
    valid: {
        method: {
            require: [
                "const map = require('lodash/map')",
                "const someOtherModule = require('some-other-module')"
            ],
            import: [
                "import map from 'lodash/map'",
                "import someOtherModule from 'some-other-module'"
            ].map(fromModule)
        },
        member: {
            require: [
                "const {map} = require('lodash')",
                "const {map: m} = require('lodash')",
                "const someOtherModule = require('some-other-module')"
            ],
            import: [
                "import {map} from 'lodash'",
                "import {map as m} from 'lodash'",
                "import someOtherModule from 'some-other-module'"
            ].map(fromModule)
        },
        full: {
            require: [
                "const _ = require('lodash')",
                "const {someMember} = require('some-other-module')"
            ],
            import: [
                "import _ from 'lodash'",
                "import * as _ from 'lodash'",
                "import {someMember} from 'some-other-module'"
            ].map(fromModule)
        }
    },
    invalid: {
        method: {
            require: [
                "const _ = require('lodash')",
                "const {map} = require('lodash')"
            ],
            import: [
                "import _ from 'lodash'",
                "import {map} from 'lodash'",
                "import * as _ from 'lodash'"
            ].map(fromModule)
        },
        member: {
            require: [
                "const _ = require('lodash')",
                "const map = require('lodash/map')"
            ],
            import: [
                "import _ from 'lodash'",
                "import map from 'lodash/map'"
            ].map(fromModule)
        },
        full: {
            require: [
                "const map = require('lodash/map')",
                "const {map} = require('lodash')"
            ],
            import: [
                "import map from 'lodash/map'",
                "import {map} from 'lodash'"
            ].map(fromModule)
        }
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
        ].map(withOption('full'))
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
        ].map(withOptionAndMessage('full'))
    ]
})
