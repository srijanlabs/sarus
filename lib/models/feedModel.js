///////////////
// feedModel //
///////////////

var parser = require('rssparser');
var db = require('../db/redisdb');

/**
 * [feed_url url to rss feed]
 * @type {String}
 */
var feed_url = "http://www.srijan.net/blog/feed";//"http://feeds.sciencedaily.com/sciencedaily/top_news?format=xml";

/**
 * [feedModel description]
 * @type {Object}
 */
var feedModel = {};
/**
 * [_fetch_feeds_and_store Private Function responsible for fetching feed and storing it to db]
 * @param  {Function} callback
 * @return {null}
 */
var _fetch_feeds_and_store = function(callback) {
    var options = {};
    parser.parseURL(feed_url, options, function(err, out) {
        // TODO ::: Handler TIMEOUT OR IN CASE OF ERROR
        if (!err) {
            var items = out.items;
            for (var i = 0; i < items.length; i++) {
                var current = items[i];
                current.index = i;
                db.client.zadd('Feeds', parseInt(i), JSON.stringify(current));
                if (i==0) console.log(JSON.stringify(current));
            }
            db.sync = true;
            callback(true);
        } else
            console.log("unable to connect with feed server");
        callback(false);
    });
};
/**
 * [_check_redis_in_sync Responsible for call __fetch_feeds_and_store in case of db is not in sync]
 * @param  {Function} callback
 * @return {null}
 */
var _check_redis_in_sync = function(callback) {
    if (db.sync) callback(true);
    else {
        _fetch_feeds_and_store(function(done) {
            callback(done);
            console.log("Fetching from RSS server.");

        });
    }
};
/**
 * [get_feed_by_index  1. checking db in sync, then 2. fetching single Article stored at location {index}]
 * @param  {int}   index
 * @param  {Function} callback
 * @return {null}
 */
feedModel.get_feed_by_index = function(index, callback) {
    _check_redis_in_sync(function(done) {
        db.client.zrange('Feeds', index, index, function(err, data) {
            // TODO ::: error handling
            var feed = JSON.parse(data.toString());
            callback(err, feed);
        });
    });
};
/**
 * [get_slugs_by_offset 1. checking db in sync, then 2. fetching slug from offset to next n (count)]
 * @param  {int}   offset
 * @param  {int}   count
 * @param  {Function} callback
 * @return {null}
 */
feedModel.get_slugs_by_offset = function(offset, count, callback) {
    _check_redis_in_sync(function(done) {
        db.client.zrange('Feeds', offset, offset + count, function(err, data) {
            //TODO ::: error handling
            var feeds = data;
            var slugs = [];
            for (var i = 0; i < feeds.length; i++) {
                var current = JSON.parse(feeds[i].toString());
                slugs.push({
                    'title': current.title,
                    'url': current.url,
                    'index': current.index
                });
            };
            callback(false, slugs);
        });
    });
};

/**
 * [exports Api Router]
 * @type {[Router]}
 */
module.exports = feedModel;
