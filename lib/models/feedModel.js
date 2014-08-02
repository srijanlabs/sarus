// Configure the feed url below.
var feed_url = "http://www.srijan.net/blog/feed";


var feedModel = {};






feedModel.getArticle = function(index) {
    return "one article";
};

feedModel.getArticles = function() {
    return "many articles";
};

feedModel.getSlugs = function(offset, count) {
    return "sidebar slugs";
};

module.exports = feedModel;
