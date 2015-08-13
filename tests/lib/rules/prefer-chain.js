///**
// * @fileoverview Prevent missing displayName in a React component definition
// * @author Yannick Croissant
// */
//'use strict';
//
//// ------------------------------------------------------------------------------
//// Requirements
//// ------------------------------------------------------------------------------
//
//var rule = require('../../../lib/rules/prop-syntax');
//var RuleTester = require('eslint').RuleTester;
//
////require('babel-eslint');
//
//// ------------------------------------------------------------------------------
//// Tests
//// ------------------------------------------------------------------------------
//
//var ruleTester = new RuleTester();
//ruleTester.run('preferred-alias', rule, {
//
//    valid: [{
//        code: [
//            'var isPublic = _.map([], function (i) { return x.id; });'
//        ].join('\n')
//    }, {
//        code: [
//            'var isPublic = _.map([], function (i) { return x.id + "?"; });'
//        ].join('\n')
//    }],
//
//    invalid: [{
//        code: [
//            'var isPublic = _.map([], function (i) { return i.id; });'
//        ].join('\n'),
//        errors: [{
//            message: "Prefer pluck syntax"
//        }]
//    }
//    ]
//});
//
//
/////*eslint no-unused-vars:0*/
/////*eslint strict:0,prop-syntax:1*/
////var _ = {};
////
//////_.each('', function () {});
//////
//////
//////var r = _.extend({}, {});
//////
//////
//////
//////_.map(
//////    _.forEach(_.map([]), function () {}),
//////    function () {}
//////);
//////
//////_([]).map(function () {}).forEach(function () {}).value();
//////
//////
//////var isPublic = _.find([], function (i) { return i === ''; });
//////isPublic = _.find([], {title: 'public'});
////
////var isPublic = _.map([], function (i) {
////    return i.id;
////});
////
////var isPublic = _.map([], function (i) { return i.id; });
////
////
//////this.sectionTops = _.times(this.props.items.length, this.getSectionTopByIndex, this);
//////
//////_.forEach(this.props.items, this.getSectionTopByIndex, this);
//////
//////this.sectionTops = _.map(this.props.items, this.getSectionTopByIndex, this);
//////
//////function getSectionTopByIndex(v, i) {
//////}
