# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).
This change log adheres to standards from [Keep a CHANGELOG](http://keepachangelog.com).


## [Unreleased][unreleased]
### Added
- (none)

[unreleased]: https://github.com/wix/eslint-plugin-lodash/compare/v1.0.0...HEAD

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

<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
 -->
