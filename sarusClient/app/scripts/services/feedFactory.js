(function() {
    'use strict';
    /* factory */
    angular.module('sarusApp.factories', [])
        .factory('Feed', FeedFactory);
    FeedFactory.$inject = ['$http'];

    function FeedFactory($http) {
        var baseUrl = "http://localhost:26192";
        // var baseUrl = "http://192.168.1.134:26192";
        // Constructor Function
        // $http.jsonp("http://www.srijan.net/blog/feed")
        // .success(function(data){
        //     console.log("success",data)
        // })
        // .error(function(data){
        //     console.log("error",data)
        // })
        function Feed() {
            this.articles = []; // array of object in sidebar
            this.full_articles = []; //array of articles in main area
            this.prev_article = 0; // check not to call server again for same article
            this.url = "/api/"; // url to fetch communticate
            this.err = "";
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
                arr_Articles.forEach(function(el) {
                    scope.load_Article(el);
                });
                scope.init_LoadSidebar(offset, count);
            },

            init_LoadSidebar: function(offset, count) {
                var scope = this;
                if (!scope.articles.length) {
                    $http.defaults.useXDomain = true;
                    $http({
                        method: 'GET',
                        url: baseUrl + scope.url + "slugs/" + offset + "/" + count
                    }).success(function(data, status) {
                        for (var i = 0; i < data.length; i++) {
                            var current = data[i];
                            scope.articles.push(current);
                        }
                    }).error(function(error, status) {
                        console.log(error);
                    });
                }
            },

            url_to_Article: function(slug) {
                var scope = this;
                scope.full_articles = [];
                scope.prev_article = 0;
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: baseUrl + scope.url + "article/url/" + slug
                }).success(function(data, status) {
                    scope.full_articles.push(data);
                    scope.init_LoadSidebar(0, 10);
                }).error(function(error, status) {
                    scope.initial_loading(0, 10, [0]);
                    console.log("Article Not Found!", error);
                });
            },



            /**
             * [load_more_feed description]
             * @param  {Function} callback [sync execution]
             * @return {[null]}            [null]
             */
            load_more_feed: function(callback) {
                var scope = this;
                var returnCallback = callback;
                var offset = 0;
                if (scope.articles.length !== 0) {
                    offset = scope.articles[scope.articles.length - 1].index + 1;
                }
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: baseUrl + scope.url + "slugs/" + offset + "/10"
                }).success(function(data, status) {
                    var l = data.length;

                    function next(val) {
                        if (val < l) {
                            var current = data[val];
                            scope.articles.push(current);
                            next(++val);
                        } else {
                            returnCallback(true);
                        }
                    }
                    next(0);
                });

            },
            load_Article: function(index) {
                var scope = this;
                // console.log(scope.url + "article/" + "1")
                $http.defaults.useXDomain = true;
                $http({
                    method: 'GET',
                    url: baseUrl + scope.url + "article/" + index
                }).success(function(data, status) {
                    scope.full_articles.push(data);
                });

            },

            // scope function will be called upon when user scroll down in content window by current render article we can get the id of next article which needs to render.
            // also when user click on title in sidebar also.

            render_Article: function(index) {
                var scope = this;
                // TODO ::: Modify logic here
                if (!scope.articles[index]) {
                    scope.load_more_feed(function() {
                        scope.load_Article(index);
                    });
                } else {
                    scope.load_Article(index);
                }

                return true;
            },

            checkAndLoadArticle: function(id) {
                var scope = this;
                var len = scope.full_articles.length;
                var found = false;
                if (id) {
                    scope.full_articles.forEach(function(ar) {
                        if (ar.index === (id + 1)) {
                            found = true;
                        }
                    });
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
