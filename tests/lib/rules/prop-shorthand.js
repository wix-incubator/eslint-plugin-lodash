'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/prop-shorthand');
var RuleTester = require('eslint').RuleTester;

//require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('prop-shorthand', rule, {

    valid: [{
        code: [
            'var isPublic = _.map([], function (i) { return x.id; });'
        ].join('\n')
    }, {
        code: [
            'var isPublic = _.map([], function (i) { return i.id + "?"; });'
        ].join('\n')
    }],

    invalid: [{
        code: [
            'var isPublic = _.map([], function (i) { return i.id; });'
        ].join('\n'),
        errors: [{
            message: 'Prefer property shorthand syntax'
        }]
    }
    ]
});


//// using the `_.matches` callback shorthand
//_.result(_.find(users, { 'age': 1, 'active': true }), 'user');
//// → 'pebbles'
//
//// using the `_.matchesProperty` callback shorthand
//_.result(_.find(users, 'active', false), 'user');
//// → 'fred'
//
//// using the `_.property` callback shorthand
//_.result(_.find(users, 'active'), 'user');
//// → 'barney'

///*eslint no-unused-vars:0*/
///*eslint strict:0,prop-syntax:1*/
//var _ = {};
//
////_.each('', function () {});
////
////
////var r = _.extend({}, {});
////
////
////
////_.map(
////    _.forEach(_.map([]), function () {}),
////    function () {}
////);
////
////_([]).map(function () {}).forEach(function () {}).value();
////
////
////var isPublic = _.find([], function (i) { return i === ''; });
////isPublic = _.find([], {title: 'public'});
//
//var isPublic = _.map([], function (i) {
//    return i.id;
//});
//
//var isPublic = _.map([], function (i) { return i.id; });
//
//
////this.sectionTops = _.times(this.props.items.length, this.getSectionTopByIndex, this);
////
////_.forEach(this.props.items, this.getSectionTopByIndex, this);
////
////this.sectionTops = _.map(this.props.items, this.getSectionTopByIndex, this);
////
////function getSectionTopByIndex(v, i) {
////}
