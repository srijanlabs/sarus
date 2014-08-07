//////////////////////
// Feed Controller  //
//////////////////////
var feedModel = require('../models/feedModel');
/**
 * [feedController ]
 * @type {Object}
 */
var feedController = {};
/**
 * [getArticle function ]
 * @param  {int}   index - article number to fetch
 * @param  {Function} callback  with err, data [Article Object ]
 * @return {null}
 */
feedController.getArticle = function(index, callback) {
    /**
     * [feedModel.get_feed_by_index calling ]
     * @argument {int} index
     * @argument {callback Function}
     * @param  {Object} err
     * @param  {Object} data
     * @return {[type]}
     */
    feedModel.get_feed_by_index(index, function(err, data) {
        callback(err, data);
    });
};

/**
 * [getSlugs function ]
 * @param  {int} Offset - from where
 * @param  {int} count - how many slug to fetch
 * @param  {Function} callback - with err, data [Article Object ]
 * @return {null}
 */

feedController.getSlugs = function(offset, count, callback) {
    /**
     * [feedModel.get_feed_by_index calling ]
     * @argument {int} index
     * @argument {int} count
     * @argument {callback Function}
         * @param  {Object} err
         * @param  {Object} data
     * @return {[type]}
     */
    feedModel.get_slugs_by_offset(offset, count, function(err, data) {
        callback(err, data);
    });
};


/**
 * [exports Home Router]
 * @type {[Router]}
 */
module.exports = feedController;
