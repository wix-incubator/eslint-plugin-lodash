'use strict';
var _ = require('lodash');
module.exports = {
    getMajorVersion: function (context) {
        return _.get(context, ['settings', 'lodash', 'version'], 4);
    },
    getLodashPragma: function (context) {
        return _.get(context, ['settings', 'lodash', 'pragma'], '_');
    }
};