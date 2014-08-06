'use strict';

/* factory */
angular.module('sarusApp.factories', [])
    .factory('Feed', function($http) {
        // Constructor Function
        function Feed() {
            this.articles = [];
            this.full_articles = [];
            this.url = "http://localhost:3000/api/";
        }

        Feed.prototype = {

            initial_loading: function(offset, count, arr_Articles) {
                var scope = this;
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

            //Above function wil be called while scrolling down by side bar after injecting it into controller.
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

        };
        return Feed;
    });
