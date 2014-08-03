'use strict';

/* factory */
angular.module('sarusApp.factories', [])
    .factory('Feed', function($http) {
        // Constructor Function
        function Feed() {
            //to store ALL feed objects
            this.articles = [];

            this.busy = false;
            //to sync between server api calls
            this.url = "http://localhost:3000/api/";

        }

        Feed.prototype = {

            initial_loading: function() {
                var scope = this;
                if (scope.busy) return;
                scope.busy = true;
                //Get first 10 slugs + 1 Article

                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: scope.url + "slugs/0/10"
                }).success(function(data, status) {
                    for (var i = 0; i < data.length; i++) {
                        var current = data[i];
                        current.available = false;
                        scope.articles.push(current);
                    }
                    scope.busy = false;
                    scope.render_Article(scope.articles[0].index);
                    console.log(scope.articles[0].index);
                });

                // TODO :: Adding on error also;
                scope.busy = false;
            },

            //Above function wil be called while scrolling down by side bar after injecting it into controller.
            load_more_feed: function() {
                var scope = this;
                if (scope.busy) return;
                scope.busy = true;
                //$http make request to get next 5 feeds[only title, url, index] and push than in ARTICLES;#
                var offset = scope.articles[scope.articles.length - 1].index + 1;
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: scope.url + "slugs/" + offset + "/5"
                }).success(function(data, status) {
                    for (var i = 0; i < data.length; i++) {
                        var current = data[i];
                        current.available = false;
                        scope.articles.push(current);
                    }
                    scope.busy = false;
                });

                // TODO :: Adding on error also;
                scope.busy = false;

            },

            load_Article: function(index) {
                var scope = this;
                if (scope.busy) return;
                scope.busy = true;
                //request for that article and update the extra data in ARTICLES[index]#
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: scope.url + "article/" + index
                }).success(function(data, status) {
                    data.available = true;
                    scope.articles[index] = data;
                    scope.busy = false;
                });

                // TODO ::: Adding on error also;
                scope.busy = false;

            },

            // scope function will be called upon when user scroll down in content window by current render article we can get the id of next article which needs to render.
            // also when user click on title in sidebar also.

            render_Article: function(index) {
                var scope = this;
                // TODO ::: Modify logic here
                if (scope.articles[index].available) return true;
                scope.load_Article(index);
                return true;
            },

        };
        return Feed;
    });
