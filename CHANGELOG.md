# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).


## [Unreleased][unreleased]
### Added
- (none)

[unreleased]: https://github.com/wix/eslint-plugin-lodash/compare/v1.1.1...HEAD

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

<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
 -->
