# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).


## [Unreleased][unreleased]
### Added
- Added option for `prefer-constant` to handle function declarations.

[unreleased]: https://github.com/wix/eslint-plugin-lodash/compare/v1.7.0...HEAD

## [1.7.0] - 2016-04-21
### Added
- Added option `ignoreObjects` to options object of `prefer-lodash-method` ([`3fc85bd`][3fc85bd])
### Fixed
- Fixed false positive reporting of `no-extra-args` when a lodash chain was within a non-lodash chain. ([`de02121`][de02121])

[3fc85bd]: https://github.com/wix/eslint-plugin-lodash/commit/3fc85bdd3f499bd59d9d6e9f667ee7264a76bf14
[de02121]: https://github.com/wix/eslint-plugin-lodash/commit/de021216e8a8d5e91f62654deefebd20f0263299
[1.7.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.7.0...v1.6.9

## [1.6.9] - 2016-04-19
### Fixed
- Stopped `prefer-noop` from reporting on empty method definitions. ([`3d35bdf`][3d35bdf])

[3d35bdf]: https://github.com/wix/eslint-plugin-lodash/commit/3d35bdf50d0b6d473e565a1755bc36800ffed184
[1.6.9]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.9...v1.6.8

## [1.6.8] - 2016-04-18
### Fixed
- Fixed case where `no-extra-args` erronously reports on `attempt` when passing arguments. ([`5cd8950`][5cd8950])

[5cd8950]: https://github.com/wix/eslint-plugin-lodash/commit/5cd89503f3b7bde658db870161b37a3f8f7e2ef1
[1.6.8]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.8...v1.6.7

## [1.6.7] - 2016-04-18
### Fixed
- Fixed case where `callback-binding` erronously reports on `zipWith` when there are multiple arguments. ([`23e7430`][23e7430])

[23e7430]: https://github.com/wix/eslint-plugin-lodash/commit/23e74300dc59cfbec12d6586e3e56c09caa52e1f
[1.6.7]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.7...v1.6.6

## [1.6.6] - 2016-04-18
### Fixed
- Added `_.filter(a, _.negate(f))` as a negative condition in `prefer-reject` ([`6092e28`][6092e28])
- Removed `Array.prototype.slice` as a native collection method because of `String.prototype.slice` ([`9476886`][9476886])

[6092e28]: https://github.com/wix/eslint-plugin-lodash/commit/6092e2843d884ef5467402f9e9f41efc2dcf1b38
[9476886]: https://github.com/wix/eslint-plugin-lodash/commit/9476886168a9c77919a0768e61a47f873a072d3e
[1.6.6]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.6...v1.6.5

## [1.6.5] - 2016-04-11
### Fixed
- Changed default config of `path-style` to `string` and removed jsPerf from docs. ([`14b8d05`][14b8d05])
- Changed recommended `path-style` to `string`. ([`66f8053`][66f8053])

[14b8d05]: https://github.com/wix/eslint-plugin-lodash/commit/14b8d05f060c496848fad8a8e05b9218134d0865
[66f8053]: https://github.com/wix/eslint-plugin-lodash/commit/66f8053fc82ea96a4446a77cc0387a3f9c18a062
[1.6.5]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.5...v1.6.4

## [1.6.4] - 2016-04-10
### Fixed
- Added `castArray` to the list of chainable methods ([`4359077`][4359077])
- Required `lodash` by major version to prevent double installation ([`a2568a9`][a2568a9])

[4359077]: https://github.com/wix/eslint-plugin-lodash/commit/4359077546644b5a1ce0b5653b72b47e12592978
[a2568a9]: https://github.com/wix/eslint-plugin-lodash/commit/a2568a9f59094aaf471dbe2b4354e31fd912b70a
[1.6.4]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.4...v1.6.3

## [1.6.3] - 2016-04-07
### Fixed
- Added `slice` as a native collection method for `prefer-lodash-chain` and `prefer-lodash-method`([`a68c606`][a68c606])

[a68c606]: https://github.com/wix/eslint-plugin-lodash/commit/a68c6062d4ceb6ffcb1256a3ecbd3458098c2cfa
[1.6.3]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.3...v1.6.2

## [1.6.2] - 2016-04-06
### Added
- Added options object with `onlyLiterals` option to `matches-prop-shorthand` and `matches-shorthand`. ([`fc4b346`][fc4b346])

[fc4b346]: https://github.com/wix/eslint-plugin-lodash/commit/fc4b3465211191609e1bbb9a430a719cb65fc072
[1.6.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.2...v1.6.1

## [1.6.1] - 2016-04-03
### Fixed
- Stopped rule `collection-method-value` from reporting on mutating method `remove`. ([`05bff20`][05bff20])

[05bff20]: https://github.com/wix/eslint-plugin-lodash/commit/05bff20eb09187c7959470c99bd8c5405a255847
[1.6.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.1...v1.6.0

## [1.6.0] - 2016-04-03
### Added
- Added rule [`collection-method-value`][collection-method-value]. ([`bc73ec8`][bc73ec8])

[bc73ec8]: https://github.com/wix/eslint-plugin-lodash/commit/bc73ec8a542577b3655818818887988e5fdb5770
[1.6.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.6.0...v1.5.3

## [1.5.3] - 2016-04-03
### Fixed
- Added missed cases in `prefer-includes`. ([`ef9058f`][ef9058f])

[ef9058f]: https://github.com/wix/eslint-plugin-lodash/commit/ef9058fbb32cfdfb9b1eb7b7350dcf5f2635e3e8
[1.5.3]: https://github.com/wix/eslint-plugin-lodash/compare/v1.5.3...v1.5.2

## [1.5.2] - 2016-03-29
### Fixed
- Added chainable methods introducted since lodash v4.0. ([`f2ab08a`][f2ab08a])
- Added fixed argument numbers for methods introduced since lodash v4.0 ([`7cb7e51`][7cb7e51])
- Fixed case where [`prefer-lodash-method`][prefer-lodash-method] didn't consider explicit chaining ([`c9ec558`][c9ec558])

[f2ab08a]: https://github.com/wix/eslint-plugin-lodash/commit/f2ab08ae0c575ccd6d4e5637adea47531bcceed1
[7cb7e51]: https://github.com/wix/eslint-plugin-lodash/commit/7cb7e5118a7fccfb3c73cd1e29fa4269ac223927
[c9ec558]: https://github.com/wix/eslint-plugin-lodash/commit/c9ec558f8b1187479016ab5ace51826869315ff6
[1.5.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.5.2...v1.5.1

## [1.5.1] - 2016-03-28
### Fixed
- Fixed error where plugin crashes ESLint [`prefer-includes`][prefer-includes]. ([`d619539`][d619539])

[19b27dd]: https://github.com/wix/eslint-plugin-lodash/commit/19b27dd00e0d99067122c413d904b15c0687ce1c
[1.5.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.5.1...v1.5.0

## [1.5.0] - 2016-03-28
### Added
- Added rule [`prefer-includes`][prefer-includes]. ([`d619539`][d619539])

[d619539]: https://github.com/wix/eslint-plugin-lodash/commit/d619539e98f6f5e4d0c7f13012e8f92b49431636
[1.5.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.5.0...v1.4.2

## [1.4.2] - 2016-03-20
### Fixed
- Fixed interations on method `sortedLastIndexBy`. ([`76b42b9`][76b42b9])


[76b42b9]: https://github.com/wix/eslint-plugin-lodash/commit/76b42b944ff4c5043aae24d4b1edaed7ceff0cec
[1.4.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.4.2...v1.4.1

## [1.4.1] - 2016-03-13
### Fixed
- Fixed `recommended` configuration. ([`25499be0`][25499be0])


[25499be0]: https://github.com/wix/eslint-plugin-lodash/commit/25499be0851b6f17d09e6e848bdb39db5e2edbcd
[1.4.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.4.1...v1.4.0

## [1.4.0] - 2016-03-13
### Added
- Added `recommended` and `v3` plugin configurations. ([`a1da5a4`][a1da5a4])


[a1da5a4]: https://github.com/wix/eslint-plugin-lodash/commit/a1da5a404fadc38b072292b7bc296f908b5a6576
[1.4.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.4.0...v1.3.0

## [1.3.0] - 2016-03-10
### Added
- Added option for exceptions to the rule `prefer-lodash-method`. ([`6a3e2cc`][6a3e2cc])
### Fixed
- Fixed a false-positive for `prefer-lodash-chain` where the callback uses lodash. ([`ed42798`][ed42798])
- Misc. Documentation fixes. ([`262c942`][262c942], [`f896337`][f896337])

[6a3e2cc]: https://github.com/wix/eslint-plugin-lodash/commit/6a3e2cc6f49e6d907316d7659de09bc1c6f95665
[ed42798]: https://github.com/wix/eslint-plugin-lodash/commit/ed4279898b40b8f9f12552d89b2ec61aa2ca6c12
[262c942]: https://github.com/wix/eslint-plugin-lodash/commit/262c942cc6b131f78b85aa7c8afddf85f14406e5
[f896337]: https://github.com/wix/eslint-plugin-lodash/commit/f8963378b76cfbe76967ce91260eb1c4d78a0118


[1.3.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.3.0...v1.2.2

## [1.2.2] - 2016-03-02
### Fixed
- Fixed an error where `forEach`, `forIn`, `forOwn`, and their right counterparts were considered chainable. ([`92e4b47`][92e4b47])

[92e4b47]: https://github.com/wix/eslint-plugin-lodash/commit/92e4b47f6d613a39980cce939cbbbab2b7da33eb


[1.2.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.2.2...v1.2.1

## [1.2.1] - 2016-02-25
### Fixed
- Fixed rules `prefer-get`, `prefer-matches`, and `prefer-is-nil` that stopped reporting in ESLint v2. ([`5054431`][5054431]);

[5054431]: https://github.com/wix/eslint-plugin-lodash/commit/50544315414c01980cf1580b8f28f3d1324287a7


[1.2.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.2.1...v1.2.0

## [1.2.0] - 2016-02-24
### Fixed
- Fixed `path-style` to report for calls to `matchesProperty`. ([`24d2ba6`][24d2ba6])
- Fixed shorthand rules to report on more methods and on iteratees that call the shorthand methods (e.g. `_.property`). ([`e42d364`][e42d364])

[24d2ba6]: https://github.com/wix/eslint-plugin-lodash/commit/24d2ba6e154b8d00691536846e95699380de45bf
[e42d364]: https://github.com/wix/eslint-plugin-lodash/commit/e42d364d82d5e2a4e3b4b2c2c92d4330c9137958


[1.2.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.2.0...v1.1.1

## [1.1.1] - 2016-02-22
### Fixed
- Fixed error where `prefer-times` crashes when using destructuring. ([`926a449`][926a449])

[926a449]: https://github.com/wix/eslint-plugin-lodash/commit/926a449043a074ec906854f4c6b3981702e91882


[1.1.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.1.1...v1.1.0

## [1.1.0] - 2016-02-21
### Added
- Added rule [`identity-shorthand`][identity-shorthand]. ([`e1e5ee3`][e1e5ee3])
- Added fixer for rule `preferred-alias`. ([`0ea186e`][0ea186e])
- Added fixer for rule `no-double-unwrap`. ([`105e873`][105e873])

[0ea186e]: https://github.com/wix/eslint-plugin-lodash/commit/0ea186e90c5cdac73a64813167761e5ee0ea6f91
[105e873]: https://github.com/wix/eslint-plugin-lodash/commit/105e8739f23fd32be5cc3d3c042d44deca259ecd
[e1e5ee3]: https://github.com/wix/eslint-plugin-lodash/commit/e1e5ee310a473f92ef19391a4cd9793cd10dbf6b


[1.1.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.1.0...v1.0.6

## [1.0.6] - 2016-02-18
### Added
- Added rule [`path-style`][path-style]. ([`7166adc`][7166adc])
- Added rule [`no-extra-args`][no-extra-args]. ([`b11e566`][b11e566])

### Changed
- Moved CONTRIBUTING.md to new .github directory. ([`d86bde2`][d86bde2])

[7166adc]: https://github.com/wix/eslint-plugin-lodash/commit/7166adc55734fda866720950c7b4ce9739c7cb4d
[b11e566]: https://github.com/wix/eslint-plugin-lodash/commit/b11e5665b2b08598045957370d1d7bfd931906b2
[d86bde2]: https://github.com/wix/eslint-plugin-lodash/commit/d86bde2d6a72d53908ac63e91e041559d407b124

[1.0.6]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.6...v1.0.5

## [1.0.5] - 2016-02-07
### Fixed
- Fixed error with rule `prefer-map` when `_` isn't lodash ([`8892139`][8892139])

[8892139]: https://github.com/wix/eslint-plugin-lodash/commit/8892139ea438dba68118bfa2fbadecb32aac2762
[1.0.5]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.5...v1.0.4

## [1.0.4] - 2016-02-04
### Fixed
- Fixed error with rule `prefer-filter` when `_` isn't lodash ([`95c3d46`][95c3d46])

[95c3d46]: https://github.com/wix/eslint-plugin-lodash/commit/95c3d46470a7c922cde355f2dd3a3e4b6983fcc3
[1.0.4]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.4...v1.0.3

## [1.0.3] - 2016-01-31
### Added
- Added support for ESLint 2 ecmaFeatures syntax ([`7a68c45`][7a68c45])

[7a68c45]: https://github.com/wix/eslint-plugin-lodash/commit/7a68c455c5f28c29fe2a01089df0db5ee82b98a0
[1.0.3]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.3...v1.0.2


## [1.0.2] - 2016-01-27
### Fixed
- Fixed error where rules assume second arg is iteratee when it isn't (e.g. `callback-binding`) ([`b3bd896`][b3bd896])

[b3bd896]: https://github.com/wix/eslint-plugin-lodash/commit/b3bd89614fb4db86f819ca95e351466da6083419
[1.0.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.2...v1.0.1

## [1.0.1] - 2016-01-27
### Fixed
- Fixed error in rule matches-shorthand which caused crashes. ([`599e8e7`][599e8e7])
- Fixed error in rule callback-binding which caused crashes in some cases ([`c985ba9`][c985ba9])

[599e8e7]: https://github.com/wix/eslint-plugin-lodash/commit/599e8e7b57aa6d5cafcaef3a5467cabb8f30d451
[c985ba9]: https://github.com/wix/eslint-plugin-lodash/commit/c985ba90addefb856e0fa7af65d6d46b20a48c30
[1.0.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.1...v1.0.0

## [1.0.0] - 2016-01-27
### Added
- Added support for using a different pragma (symbol) as the Lodash object using [shared settings](http://eslint.org/docs/user-guide/configuring#adding-shared-settings). ([`e4dc506`][e4dc506])
- Added rule [`prefer-is-nil`][prefer-is-nil]. ([`ee23d5b`][ee23d5b])
- Added rule [`prefer-over-quantifier`][prefer-over-quantifier]. ([`b9aa62d`][b9aa62d])
- Added rule [`prefer-flat-map`][prefer-flat-map]. ([`8c0dfcb`][8c0dfcb])
- Added [Contribution guidelines][CONTRIBUTING]. ([`0acfdc8`][0acfdc8])

### Changed
- Changed rule `no-unnecessary-bind` to rule [`callback-binding`][callback-binding], that is dependent on major Lodash version specified in the shared settings. ([`a107ad5`][a107ad5])
- Changed all rules to be dependent on major Lodash version specified in settings for method aliases. ([`6f3e204`][6f3e204])
- Changed rule prefer-invoke to [`prefer-invoke-map`][prefer-invoke-map] and made it only relevant for version 4. ([`90d057c`][90d057c])
- Changed rule `no-commit` to not accept forEach cases, and made it only relevant for version 4. ([`c28ba30`][c28ba30])
- Changed rule [`matches-shorthand`][matches-shorthand] "always" option to report only when there are multiple properties or when the resulting object can be shortened to `{property}` syntax. ([`30fde0e`][30fde0e]).
- Changed rule [`matches-prop-shorthand`][matches-prop-shorthand] "never" option to report on the syntax depending on the version. ([`b17c145`][b17c145])

[e4dc506]: https://github.com/wix/eslint-plugin-lodash3/commit/e4dc50681ee667e3111fedd6dbd6147f9c4fa7b0
[ee23d5b]: https://github.com/wix/eslint-plugin-lodash3/commit/ee23d5bef217650f083f6f4b98e041b18c1be68c
[a107ad5]: https://github.com/wix/eslint-plugin-lodash3/commit/a107ad5f7ee523bc1131d5ebb9ffc68b1935038c
[6f3e204]: https://github.com/wix/eslint-plugin-lodash3/commit/6f3e2043bf30f925f7cd0840e115402dd5b40fbc
[b9aa62d]: https://github.com/wix/eslint-plugin-lodash3/commit/b9aa62db63698e9458062b240467d493eb94c0d5
[8c0dfcb]: https://github.com/wix/eslint-plugin-lodash3/commit/8c0dfcb4706d275ae669c65bb5942e462b7c5f65
[0acfdc8]: https://github.com/wix/eslint-plugin-lodash3/commit/0acfdc85afa70da7150c481048fa2fc124612f0b
[90d057c]: https://github.com/wix/eslint-plugin-lodash3/commit/90d057c3e298349a13ea2fcc0fcbae15702351f1
[c28ba30]: https://github.com/wix/eslint-plugin-lodash3/commit/c28ba30ed567d6ba15f7d048215aa7c6c5376d11
[30fde0e]: https://github.com/wix/eslint-plugin-lodash3/commit/30fde0e779eea7b14f60c6cd9ca8b211acd7dd7f
[b17c145]: https://github.com/wix/eslint-plugin-lodash3/commit/b17c1453ecf06fd2f1df686c26836f0615d5ca57
[1.0.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.0...v0.6.0

[CONTRIBUTING]: /CONTRIBUTING.md

[prefer-is-nil]: docs/rules/prefer-is-nil.md
[callback-binding]: docs/rules/callback-binding.md
[prefer-over-quantifier]: docs/rules/prefer-over-quantifier.md
[prefer-flat-map]: docs/rules/prefer-flat-map.md
[prefer-invoke-map]: docs/rules/prefer-invoke-map.md
[matches-shorthand]: docs/rules/matches-shorthand.md
[matches-prop-shorthand]: docs/rules/matches-prop-shorthand.md
[path-style]: docs/rules/path-style.md
[no-extra-args]: docs/rules/no-extra-args.md
[identity-shorthand]: docs/rules/identity-shorthand.md
[prefer-includes]: docs/rules/prefer-includes.md
[prefer-lodash-method]: docs/rules/prefer-lodash-method.md
[collection-method-value]: docs/rules/collection-method-value.md

<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
 -->
