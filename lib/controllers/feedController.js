var feedModel = require('../models/feedModel');

var feedController = {};

feedController.getArticle = function(index) {
    feedModel.get_feed_by_index(index, function(err, data) {
        if (err) return false;
        return data;
    });
};

feedController.getArticles = function() {
    feedModel.get_all_feeds(function(err, data) {
        if (err) return false;
        return data;
    });
};

feedController.getSlugs = function(offset, count) {
    feedModel.get_slugs_by_offset(offset, count, function(err, data) {
        if (err) return false;
        return data;
    });
};

module.exports = feedController;
