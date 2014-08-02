var feedModel = require('../models/feedModel');

var feedController = {};

feedController.getArticle = function(index,callback) {
    feedModel.get_feed_by_index(index, function(err, data) {
        callback(err,data);
    });
};

feedController.getArticles = function(callback) {
    feedModel.get_all_feeds(function(err, data) {
        callback(err,data);
    });
};

feedController.getSlugs = function(offset, count,callback) {
    feedModel.get_slugs_by_offset(offset, count, function(err, data) {
        callback(err,data);
    });
};

module.exports = feedController;
