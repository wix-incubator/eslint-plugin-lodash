# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).


## [Unreleased][unreleased]
### Added
- (none)

[unreleased]: https://github.com/wix/eslint-plugin-lodash/compare/v2.7.0...HEAD

## [2.7.0] - 2018-03-17
### Added
- Added rule `prefer-immutable-method` ([`c4fe9cd`][c4fe9cd])
- Added rule `prefer-find` ([`c81ef24`][c81ef24])

[c4fe9cd]: https://github.com/wix/eslint-plugin-lodash/commit/c4fe9cd709385b394c8b6418d958c3c266f953b7
[c81ef24]: https://github.com/wix/eslint-plugin-lodash/commit/c81ef24cbe8cfa5f9fa27a31da9301a53f240ef0
[2.7.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.7.0...v2.6.2

## [2.6.2] - 2018-03-16
### Fixed
- Fixed `recommended` config to include `lodash` in the list of plugins ([`6381bff`][6381bff])

[6381bff]: https://github.com/wix/eslint-plugin-lodash/commit/6381bff9db2cf3012629eae5c4df2b8803d9ef31
[2.6.2]: https://github.com/wix/eslint-plugin-lodash/compare/v2.6.2...v2.6.1

## [2.6.1] - 2018-02-04
### Fixed
- Fixed `prefer-compact` to report on `_.filter` with identity shorthand ([`55f6de3`][55f6de3])

[55f6de3]: https://github.com/wix/eslint-plugin-lodash/commit/55f6de3f796070b8648e01e187eee16b6ddd8950
[2.6.1]: https://github.com/wix/eslint-plugin-lodash/compare/v2.6.1...v2.6.0

## [2.6.0] - 2018-01-31
### Added
- Added support for whitelisting in `preferred-alias` ([`c4b7fca`][c4b7fca])

[c4b7fca]: https://github.com/wix/eslint-plugin-lodash/commit/c4b7fca2ad81374563b243e9290d006c7267e864
[2.6.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.6.0...v2.5.1

## [2.5.1] - 2018-01-22
### Fixed
- Fix case where collection-return erronously reports on generator functions ([`19079ef`][19079ef])

[3037b9f]: https://github.com/wix/eslint-plugin-lodash/commit/19079efa2c5584ed5e0e4f11ed97d797a405f9f8
[2.5.1]: https://github.com/wix/eslint-plugin-lodash/compare/v2.5.1...v2.5.0

## [2.5.0] - 2017-10-20
### Added
- Added support for single-method packages ([`3037b9f`][3037b9f])
- Added option to enforce single-method packages import in `import-scope` ([`e4555c3`][e4555c3])

[3037b9f]: https://github.com/wix/eslint-plugin-lodash/commit/3037b9f8d858ab0e263f1e1f06bac9459c0aa8c8
[e4555c3]: https://github.com/wix/eslint-plugin-lodash/commit/e4555c3c2475813a07dc42031acb1daa52d251a0
[2.5.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.5.0...v2.4.4

## [2.4.4] - 2017-07-12
### Fixed
- Added a step to clean old generated files before every build ([`18c0eeb`][18c0eeb])

[18c0eeb]: https://github.com/wix/eslint-plugin-lodash/commit/18c0eeb87cadd29d5022cd7337b2dd42ccd74e99
[2.4.4]: https://github.com/wix/eslint-plugin-lodash/compare/v2.4.4...v2.4.3

## [2.4.3] - 2017-06-19
### Fixed
- Fixed `prefer-over-quantifier` warning on condition functions with more than one argument ([`cf10ed1`][cf10ed1])

[cf10ed1]: https://github.com/wix/eslint-plugin-lodash/commit/cf10ed1c05ea532bee1fdb2dba92e2abfb293b6d
[2.4.3]: https://github.com/wix/eslint-plugin-lodash/compare/v2.4.3...v2.4.2

## [2.4.2] - 2017-05-01
### Fixed
- Fixed `prefer-lodash-method` warning on string methods not in the current version ([`401d28a`][401d28a])

[401d28a]: https://github.com/wix/eslint-plugin-lodash/commit/401d28aaee8d7fd23b2b388243739eecb07a2052
[2.4.2]: https://github.com/wix/eslint-plugin-lodash/compare/v2.4.2...v2.4.1

## [2.4.1] - 2017-04-26
### Fixed
- Reimpleneted rule `callback-binding` to use method data ([`97375de`][97375de])

[97375de]: https://github.com/wix/eslint-plugin-lodash/commit/97375defe7a299e6262618ffb0a6cc80c0bcac6e
[2.4.1]: https://github.com/wix/eslint-plugin-lodash/compare/v2.4.1...v2.4.0

## [2.4.0] - 2017-03-27
### Added
- Added rule `prefer-some` ([`842f02d`][842f02d])
### Fixed
- Fixed error where `no-extra-args` did not warn on methods with 0 arguments ([`8d960ce`][8d960ce])
- Added data for methods `conformsTo` and `defaultTo` ([`5333ff0`][5333ff0])

[842f02d]: https://github.com/wix/eslint-plugin-lodash/commit/842f02d4587102f5cbe32f9ebe29c9f1dc1dee13
[8d960ce]: https://github.com/wix/eslint-plugin-lodash/commit/8d960ce9a05b5753e733e644bc0d1303f84b3bdf
[5333ff0]: https://github.com/wix/eslint-plugin-lodash/commit/5333ff03d2657217db002065679ac027f1cbf6aa
[2.4.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.4.0...v2.3.7

## [2.3.7] - 2017-03-23
### Fixed
- Added `sortedUniq` and `sortedUniqBy` as chainable methods ([`fcde2c0`][fcde2c0])

[fcde2c0]: https://github.com/wix/eslint-plugin-lodash/commit/fcde2c0adac04f6d0c6c3744a547dfaaefd8be4f
[2.3.7]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.7...v2.3.6

## [2.3.6] - 2017-03-15
### Fixed
- Added ES2015 string methods to `prefer-lodash-method` ([`6aa51cb`][6aa51cb])

[6aa51cb]: https://github.com/wix/eslint-plugin-lodash/commit/6aa51cbbe192233e25527c95e44949b02088c96a
[2.3.6]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.6...v2.3.5

## [2.3.5] - 2017-02-08
### Fixed
- Fixed `import-scope` to stop warning against `lodash/fp` ([`c569b8c`][c569b8c])

[c569b8c]: https://github.com/wix/eslint-plugin-lodash/commit/c569b8c8ed50031a7e4b78b06708bd70f008d7fe
[2.3.5]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.5...v2.3.4

## [2.3.4] - 2017-01-29
### Fixed
- Fixed `prefer-noop` to stop reporting on async and generator functions ([`7d194cf`][7d194cf])

[7d194cf]: https://github.com/wix/eslint-plugin-lodash/commit/44ebdca9fbd529b9bad6be1848feed1df
[2.3.4]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.4...v2.3.3

## [2.3.3] - 2017-01-25
### Fixed
- Added missing shorthand functions for shorthand rules ([`1c290d0`][1c290d0])

[1c290d0]: https://github.com/wix/eslint-plugin-lodash/commit/1c290d0d6fb754a25357bdb0ba6b5a19da366de1
[2.3.3]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.3...v2.3.2

## [2.3.2] - 2017-01-18
### Fixed
- Allowed async functions in `collection-return` ([`9d0a082`][9d0a082])

[9d0a082]: https://github.com/wix/eslint-plugin-lodash/commit/9d0a082b7fca98e89f137f927fba13bd1005516e
[2.3.2]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.2...v2.3.1


## [2.3.1] - 2017-01-17
### Fixed
- Allowed asterisk import in `import-scope` in `full` config ([`4c0335e`][4c0335e])

[4c0335e]: https://github.com/wix/eslint-plugin-lodash/commit/4c0335ec3b5d593b032a7876105bd2cacf2737c9
[2.3.1]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.1...v2.3.0

## [2.3.0] - 2017-01-16
### Added
- Added rule `import-scope` ([`def5067`][def5067])
### Fixed
- Fixed case in `v3` where `collection-method-value` warns when using `commit` ([`38394d4`][38394d4])

[def5067]: https://github.com/wix/eslint-plugin-lodash/commit/def50672f52a372dd89d219f94deb647faddf0ef
[38394d4]: https://github.com/wix/eslint-plugin-lodash/commit/38394d4c5a32f69a575362a30786b7befd7829d4
[2.3.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.3.0...v2.2.5

## [2.2.5] - 2016-12-20
### Fixed
- Removed `no-unbound-this` from the `v3` config ([`5d62f9f`][5d62f9f])

[5d62f9f]: https://github.com/wix/eslint-plugin-lodash/commit/5d62f9fd145b2ae2bd6f00d9567afbfe1f496594
[2.2.5]: https://github.com/wix/eslint-plugin-lodash/compare/v2.2.5...v2.2.4

## [2.2.4] - 2016-12-15
### Fixed
- Fixed false positive in `prefer-invoke-map` ([`5a8067d`][5a8067d])

[5a8067d]: https://github.com/wix/eslint-plugin-lodash/commit/5a8067de6a9b1f646c6b536d15c5735a29622092
[2.2.4]: https://github.com/wix/eslint-plugin-lodash/compare/v2.2.4...v2.2.3

## [2.2.3] - 2016-12-08
### Fixed
- Fixed false positive in `matches-prop-shorthand` ([`5373377`][5373377])

[5373377]: https://github.com/wix/eslint-plugin-lodash/commit/5373377f5e31284e0df08427a9c6f6ca9c5ae422
[2.2.3]: https://github.com/wix/eslint-plugin-lodash/compare/v2.2.3...v2.2.2

## [2.2.2] - 2016-12-01
### Added
- Added support for `lodash-es`. ([`d9caeb0`][d9caeb0])

[d9caeb0]: https://github.com/wix/eslint-plugin-lodash/commit/d9caeb0875b6ca6c9d5c95415cd507aa6a99a7a4
[2.2.2]: https://github.com/wix/eslint-plugin-lodash/compare/v2.2.2...v2.2.1

## [2.2.1] - 2016-11-30
### Fixed
- Fixed crash in `chaining` rule. ([`ccdae5`][ccdae5])

[ccdae5]: https://github.com/wix/eslint-plugin-lodash/commit/ccdae593a9e91b8300890cc31a10d3bdd73c05b7
[2.2.1]: https://github.com/wix/eslint-plugin-lodash/compare/v2.2.1...v2.2.0

## [2.2.0] - 2016-11-09
### Added
- Added rule `no-unbound-this`. ([`3e61f0c`][3e61f0c])

[3e61f0c]: https://github.com/wix/eslint-plugin-lodash/commit/3e61f0c09c2a322ec8ce632950942021a13d7c9f
[2.2.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.2.0...v2.1.8

## [2.1.8] - 2016-11-08
### Fixed
- Improve performance of shorthand rules. ([`5eed1ec`][5eed1ec])

[5eed1ec]: https://github.com/wix/eslint-plugin-lodash/commit/5eed1ecc6900035f51cc72c336bf70abf88b4143
[2.1.8]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.8...v2.1.7

## [2.1.7] - 2016-10-27
### Fixed
- Fixed `preferred-alias` erronous warning on `_.toString`. ([`d1df139`][d1df139])
- Fixed crash in `prefer-over-quantifier` ([`caf5b8a`][caf5b8a])

[d1df139]: https://github.com/wix/eslint-plugin-lodash/commit/d1df139e3d15ebb5610393b6b3f0c241a7087459
[caf5b8a]: https://github.com/wix/eslint-plugin-lodash/commit/caf5b8aff6b67a9f841938263ea8857ca0fa1453
[2.1.7]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.7...v2.1.6

## [2.1.6] - 2016-10-22
### Fixed
- Fixed `callback-binding` warning on methods with `fromIndex` in v4. ([`1d6a958`][1d6a958])

[1d6a958]: https://github.com/wix/eslint-plugin-lodash/commit/1d6a958b7715e4b895394497c3b36ea12bc76fc5
[2.1.6]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.6...v2.1.5

## [2.1.5] - 2016-10-22
### Fixed
- Fixed crash in `preferred-alias` in cases of single-method import. ([`c787496`][c787496])
- Fixed devDependency of `eslint-traverser` to correct version. ([`e8cd613`][e8cd613])
- Fixed incorrect warning of `chaining` rule when importing `toString`. ([`b105870`][b105870])

[c787496]: https://github.com/wix/eslint-plugin-lodash/commit/c78749652e0c34041b419fbfd0a9741224483bd7
[e8cd613]: https://github.com/wix/eslint-plugin-lodash/commit/e8cd61391026d8d8e708ba2c4b4a72e73a6a1fb5
[b105870]: https://github.com/wix/eslint-plugin-lodash/commit/b105870f8d27cadae9ed8ce07056f2b603d6a8c2
[2.1.5]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.5...v2.1.4

## [2.1.4] - 2016-10-20
### Fixed
- Fixed crash in `prefer-over-quantifier`. ([`906fd72`][906fd72])

[906fd72]: https://github.com/wix/eslint-plugin-lodash/commit/906fd723496ce0d570f5d30e2dabe0cf07c6944b
[2.1.4]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.4...v2.1.3

## [2.1.3] - 2016-10-17
### Fixed
- Fixed crash in `callback-binding` for node versions under 6. ([`afe904f`][afe904f])

[afe904f]: https://github.com/wix/eslint-plugin-lodash/commit/afe904f52ea7df75a52996637d87edf44b72e067
[2.1.3]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.3...v2.1.2

## [2.1.2] - 2016-10-15
### Fixed
- Fixed crash in `prefer-filter`. ([`8d1d07c`][8d1d07c])

[8d1d07c]: https://github.com/wix/eslint-plugin-lodash/commit/8d1d07c6264a1304a3ffcdaee01152e061869524
[2.1.2]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.2...v2.1.1

## [2.1.1] - 2016-10-14
### Fixed
- Fixed crash in `matches-shorthand` and `prefer-is-nil`. ([`de49782`][de49782])

[de49782]: https://github.com/wix/eslint-plugin-lodash/commit/de49782ffc0c325acc26d8f4db21f136209d04ee
[2.1.1]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.1...v2.1.0

## [2.1.0] - 2016-10-13
### Added
- Added String.prototype methods to `prefer-lodash-method`. ([`6a44330`][6a44330])
### Fixed
- Fixed schema for `prefer-lodash-method`. ([`a3eb338`][a3eb338])

[6a44330]: https://github.com/wix/eslint-plugin-lodash/commit/6a443301960f4e173b4e8911b2b4986066ed2eb2
[a3eb338]: https://github.com/wix/eslint-plugin-lodash/commit/a3eb3388e92c47ac8e182dd203133703ee6c426c
[2.1.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.1.0...v2.0.0

## [2.0.0] - 2016-10-13
### Added
- Added support for single-method imports in all rules. ([`8a55217`][8a55217])
### Changed
- Changed role of the `pragma` setting to be a hint instead of mandatory and removed the default pragma, `_`. ([`8a55217`][8a55217])
- Changed recommended config to be pragma-less and added the `canonical` config for use with the full lodash build's `_` pragma. ([`8a55217`][8a55217])
- Changed `prefer-lodash-method`'s config object to only accept two values: `ignoreMethods` and `ignoreObjects`, both regular expressions. ([`fc9ecee`][fc9ecee])
- Joined `prefer-chain` and `no-single-chain` into single rule, `chaining` that also enables disallowing chaining. ([`685e9e3`][685e9e3])
- Changed rule `path-style` so that `as-needed` now only recommends arrays when using strings with variables ([`6ab30e6`][6ab30e6])
### Removed
- Removed support for node 0.10. ([`8a55217`][8a55217])
### Fixed
- Fixed `prefer-lodash-typecheck` to warn on undefined checks of declared variables. ([`8ee071a`][8ee071a])
- Fixed case in `prefer-map` where the push is from a declared iteratee parameter. ([`fc5a592`][fc5a592])
- Fixed case where `prop-shorthand` would warn erronously. ([`764f8a0`][764f8a0])

[8ee071a]: https://github.com/wix/eslint-plugin-lodash/commit/8ee071a43b9c43ff2608d07c74b5c79344ae7351
[8a55217]: https://github.com/wix/eslint-plugin-lodash/commit/8a5521746d6e1af808779c0e17e6e39f3c1c1c45
[fc9ecee]: https://github.com/wix/eslint-plugin-lodash/commit/fc9ecee018811078bc812d17783ec430959e49c7
[685e9e3]: https://github.com/wix/eslint-plugin-lodash/commit/685e9e310b7a96b266bb13ee144020c499f47ebc
[fc5a592]: https://github.com/wix/eslint-plugin-lodash/commit/fc5a5923ca9eb5e7c1f584492d03641bdf649bb8
[fc5a592]: https://github.com/wix/eslint-plugin-lodash/commit/764f8a067311f940b02329aa051df007b62c9202
[6ab30e6]: https://github.com/wix/eslint-plugin-lodash/commit/6ab30e6f8713f88d93f95cc3f0d00ea67b27dbe6
[2.0.0]: https://github.com/wix/eslint-plugin-lodash/compare/v2.0.0...v1.10.3

## [1.10.3] - 2016-09-05
### Fixed
- Made `prefer-lodash-method` not warn for `Object.create(null)`. ([`62f82fb`][62f82fb])

[62f82fb]: https://github.com/wix/eslint-plugin-lodash/commit/62f82fb50a71f93ebe4d5834e818acdca22f6d22
[1.10.3]: https://github.com/wix/eslint-plugin-lodash/compare/v1.10.3...v1.10.2

## [1.10.2] - 2016-09-04
### Fixed
- Improved preformance for `unwrap`. ([`95be25a`][95be25a])
- Added explanantion to docs for `prefer-lodash-method`. ([`1d57005`][1d57005])

[95be25a]: https://github.com/wix/eslint-plugin-lodash/commit/95be25a5e73e72fda7616fc0853726cd1abf49b0
[1d57005]: https://github.com/wix/eslint-plugin-lodash/commit/1d570057a19795a2eb3853a90826b1a318034967
[1.10.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.10.2...v1.10.1

## [1.10.1] - 2016-07-27
### Fixed
- Fixed case where `prefer-invoke-map` reports on destructured first iteratee arguments ([`88a7e54`][88a7e54])

[88a7e54]: https://github.com/wix/eslint-plugin-lodash/commit/88a7e544850163354daed351b719e1d416e18807
[1.10.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.10.1...v1.10.0


## [1.10.0] - 2016-07-20
### Added
- Added option `ignorePatterns` to config of rule `prefer-lodash-method`. ([`1c01a5f`][1c01a5f])

[1c01a5f]: https://github.com/wix/eslint-plugin-lodash/commit/1c01a5f023a7b29f4825132086eec946db3569d2
[1.10.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.10.0...v1.9.4

## [1.9.4] - 2016-07-05
### Fixed
- Added peerDependency for eslint >= 1.3.0 ([`4793496`][4793496])

[4793496]: https://github.com/wix/eslint-plugin-lodash/commit/47934965306a5056b7614729801031627ba2fa64
[1.9.4]: https://github.com/wix/eslint-plugin-lodash/compare/v1.9.4...v1.9.3

## [1.9.3] - 2016-07-05
### Fixed
- Fixed argument counts for `find`, `findIndex`, `findLast` and `findLastIndex`. ([`bc7023a`][bc7023a])

[bc7023a]: https://github.com/wix/eslint-plugin-lodash/commit/bc7023a2f663d1895ba2c456c962ca6ccddf9f61
[1.9.3]: https://github.com/wix/eslint-plugin-lodash/compare/v1.9.3...v1.9.2

## [1.9.2] - 2016-06-02
### Fixed
- Fixed typo in argument count for Lodash 4 method `stubFalse`. ([`7efc67c`][7efc67c])

[7efc67c]: https://github.com/wix/eslint-plugin-lodash/commit/7efc67c9aa4b97f281b36beca584aff34bd1396f
[1.9.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.9.2...v1.9.1

## [1.9.1] - 2016-05-30
### Fixed
- Aligned method data to `v4.13.x` (argument counts and chainable methods). ([`565bad6`][565bad6])

[565bad6]: https://github.com/wix/eslint-plugin-lodash/commit/565bad6f5e0c60c521700a41f7d1e1602fc77e88
[1.9.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.9.1...v1.9.0

## [1.9.0] - 2016-05-19
### Added
- Created rule [`consistent-compose`]. ([`1028c0d`][1028c0d])

[1028c0d]: https://github.com/wix/eslint-plugin-lodash/commit/1028c0d744b1d51579246bb5736329f771d99b47
[1.9.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.9.0...v1.8.5

## [1.8.5] - 2016-05-17
### Fixed
- Changed `prefer-matches` rule's error message to suggest `_.isMatch` instead ([`7597075`][7597075])
- Fixed `prefer-lodash-method` rule's `ignoreObjects` parameter to accept complex objects like `React.Children` ([`f02a1f4`][f02a1f4])

[7597075]: https://github.com/wix/eslint-plugin-lodash/commit/75970752563bc793f8be5837805aff831eefae94
[f02a1f4]: https://github.com/wix/eslint-plugin-lodash/commit/f02a1f49ebfa91ab1d7c3ee91e92eb6230af202b
[1.8.5]: https://github.com/wix/eslint-plugin-lodash/compare/v1.8.5...v1.8.4

## [1.8.4] - 2016-05-05
### Fixed
- Fixed case where `callback-binding` reports false positive on `_.sortedIndexBy`. ([`4a04eed`][4a04eed])

[4a04eed]: https://github.com/wix/eslint-plugin-lodash/commit/4a04eed61edfbc6e07c966e17501c16e319649b8
[1.8.4]: https://github.com/wix/eslint-plugin-lodash/compare/v1.8.4...v1.8.3

## [1.8.3] - 2016-05-01
### Fixed
- Fixed case where `collection-return` reports false positive in nested arrow functions. ([`e59f507`][e59f507])

[e59f507]: https://github.com/wix/eslint-plugin-lodash/commit/e59f50754bf9fa9463d98db9f0861fefbd3d2144
[1.8.3]: https://github.com/wix/eslint-plugin-lodash/compare/v1.8.3...v1.8.2

## [1.8.2] - 2016-04-28
### Fixed
- Fixed case where `prefer-times` crashes. ([`c199ed5`][c199ed5])

[c199ed5]: https://github.com/wix/eslint-plugin-lodash/commit/c199ed5f3c055648791079142c9afdee666ffbed
[1.8.2]: https://github.com/wix/eslint-plugin-lodash/compare/v1.8.2...v1.8.1

## [1.8.1] - 2016-04-27
### Fixed
- Fixed case where `prefer-times` falsely reports when parameter usage is nested. ([`ae8b626`][ae8b626])

[ae8b626]: https://github.com/wix/eslint-plugin-lodash/commit/ae8b626cf59de5ddd52785a8822c83fbc6381a2e
[1.8.1]: https://github.com/wix/eslint-plugin-lodash/compare/v1.8.1...v1.8.0

## [1.8.0] - 2016-04-24
### Added
- Added option for `prefer-constant` to handle function declarations. ([`51ce13d`][51ce13d])

[51ce13d]: https://github.com/wix/eslint-plugin-lodash/commit/51ce13d5f2c732460e99b93c99cebd0ca1e56df4
[1.8.0]: https://github.com/wix/eslint-plugin-lodash/compare/v1.8.0...v1.7.0

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
[consistent-compose]: docs/rules/consistent-compose.md

<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
 -->
