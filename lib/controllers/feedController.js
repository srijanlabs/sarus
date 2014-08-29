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
        if (data)
            callback(err, data);
        else
            callback({
                Msg: "Not Found!"
            }, data);
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
 * [getUrl_Article description]
 * @param  {String}   url_Link [String url link of an article]
 * @param  {Function} callback [after getting the article it will return it ]
 * @return {null}
 */
feedController.getUrl_Article = function(url_Link, callback) {
    /**
     * [description]
     * @argument {String} url_link  [String url link of an article]
     * @param  {Object} err  [description]
     * @param  {Object} data [Articel object or null]
     * @return {[type]}      [description]
     */
    feedModel.get_Article_by_url(url_Link, function(err, data) {
        callback(err, data);
    });
};
/**
 * [exports Home Router]
 * @type {[Router]}
 */
module.exports = feedController;
