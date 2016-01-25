'use strict';
var _ = require('lodash');
module.exports = {
    /**
     * Returns the lodash object settings, with default values if missing
     * @param context
     * @returns {LodashSettings}
     */
    getSettings: function (context) {
        return _.chain(context)
            .get(['settings', 'lodash'])
            .defaults({
                pragma: '_',
                version: 4
            })
            .value();
    }
};

/**
 @typedef {Object} LodashSettings
 @property {String} pragma - The symbol that signifies Lodash (default is '_').
 @property {Number} version - The major version number (default is 4).
*/