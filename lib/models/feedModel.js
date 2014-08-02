var parser = require('rssparser');
var db = require('../db/redisdb');

// Configure the feed url below.
var feed_url = "http://feeds.sciencedaily.com/sciencedaily/top_news?format=xml"; //"http://www.srijan.net/blog/feed";
var feedModel = {};

// fetching from rss source and storing in database
var fetch_feeds_and_store = function(callback) {
    var options = {};
    parser.parseURL(feed_url, options, function(err, out) {
        if (!err) {
            var items = out.items;
            for (var i = 0; i < items.length; i++) {
                var current = items[i];
                current.index = i;
                db.client.zadd('Feeds', parseInt(i), JSON.stringify(current));
            }
            db.sync = true;
            callback(true);
        } else
            console.log("unable to connect with feed server");
        callback(false);
    });
};

var check_redis_in_sync = function(callback) {
    if (db.sync) callback(true);
    else {
        fetch_feeds_and_store(function(done) {
            callback(done);
            console.log("Fetching from RSS server.");

        });
    }
};

feedModel.get_feed_by_index = function(index, callback) {
    check_redis_in_sync(function(done) {
        db.client.zrange('Feeds', index, index, function(err, data) {
            // TODO ::: error handling
            var feed = JSON.parse(data.toString());
            callback(err, feed);
        });
    });
};

feedModel.get_slugs_by_offset = function(offset, count, callback) {
    check_redis_in_sync(function(done) {
        db.client.zrange('Feeds', offset, offset+count, function(err, data) {
            //TODO ::: error handling
            var feeds = new Array(data.toString());
            var slugs = [];
            for (var i = 0; i < feeds.length; i++) {
                var current = JSON.parse(feeds[i]);
                slugs.push({
                    'title': current.title,
                    'url': current.url,
                    'index': current.index
                });
            };
            callback(false,slugs);
        });
    });
};

module.exports = feedModel;
