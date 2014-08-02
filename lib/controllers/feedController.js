var feedModel = require('./models/feedModel');

var feedController = {};

feedController.getArticle = function(index) {
    feedModel.getArticle(index);
};

feedController.getArticles = function() {
    feedModel.getArticles();
};
feedController.getSlugs = function(offset, count) {
    feedModel.getSlugs(offset, count);
};


module.exports = feedController;
