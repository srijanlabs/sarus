'use strict';
/* factory */
(function() {


    angular.module('sarusApp.factories', [])
        .factory('Feed', Feed);

    function Feed($http) {
        // Constructor Function
        function Feed() {
            this.articles = []; // array of object in sidebar
            this.full_articles = []; //array of articles in main area
            this.prev_article = 0; // check not to call server again for same article
            this.url = "/api/"; // url to fetch communticate
        }

        Feed.prototype = {
            /**
             * [initial_loading description]
             * @param  {[int]} offset       [starting from slug index]
             * @param  {[int]} count        [how many to fetch]
             * @param  {[array]} arr_Articles [array of article index for rendering in one go in main area]
             * @return {[null]}              [description]
             */
            initial_loading: function(offset, count, arr_Articles) {
                var scope = this;
                scope.full_articles = [];
                scope.prev_article = 0;
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: scope.url + "slugs/" + offset + "/" + count
                }).success(function(data, status) {
                    for (var i = 0; i < data.length; i++) {
                        var current = data[i];
                        scope.articles.push(current);
                    }
                    arr_Articles.forEach(function(el) {
                        scope.render_Article(scope.articles[el].index);
                    });
                });
            },

            /**
             * [load_more_feed description]
             * @param  {Function} callback [sync execution]
             * @return {[null]}            [null]
             */
            load_more_feed: function(callback) {
                var scope = this;
                var offset = scope.articles[scope.articles.length - 1].index + 1;
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: scope.url + "slugs/" + offset + "/10"
                }).success(function(data, status) {
                    for (var i = 0; i < data.length; i++) {
                        var current = data[i];
                        scope.articles.push(current);

                    }
                    callback(true);
                });

            },

            load_Article: function(index) {
                var scope = this;
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: scope.url + "article/" + index
                }).success(function(data, status) {
                    scope.full_articles.push(data);
                });

            },

            // scope function will be called upon when user scroll down in content window by current render article we can get the id of next article which needs to render.
            // also when user click on title in sidebar also.

            render_Article: function(index) {
                var scope = this;
                // TODO ::: Modify logic here
                if (!scope.articles[index]) scope.load_more_feed(function(done) {
                    scope.load_Article(index);
                });
                else
                    scope.load_Article(index);

                return true;
            },

            checkAndLoadArticle: function(id) {
                var scope = this;
                var len = scope.full_articles.length;
                var found = false;
                if (id) {
                    scope.full_articles.forEach(function(ar) {
                        if (ar.index === id + 1) found = true;
                    })
                }
                if (!found) {
                    if (scope.full_articles[len - 1]) {
                        var index = scope.full_articles[len - 1].index;
                        var next_index = index + 1;
                        // console.log(scope.prev_article, next_index);
                        if (scope.prev_article < next_index) {
                            scope.prev_article = next_index;
                            scope.render_Article(next_index);
                        }


                    }
                }
            },

            loadSpecificArticle: function(index) {
                var scope = this;
                scope.full_articles = [];
                scope.prev_article = 0;
                scope.render_Article(index);
            }

        };
        return Feed;
    }



}());
