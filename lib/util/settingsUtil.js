'use strict';
var _ = require('lodash');
module.exports = {
    getLodashPragma: function (context) {
        return _.get(context, ['settings', 'lodash', 'pragma'], '_');
    }
};