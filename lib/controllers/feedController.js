var feedController = {};

feedController.getArticle = function(index) {
    return "one article";
};

feedController.getArticles = function() {
    return "many articles";
};
feedController.getSlugs = function(offset, count) {
    return "sidebar slugs";
};


module.exports = feedController;
