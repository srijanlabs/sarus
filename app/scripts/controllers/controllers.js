'use strict';

/* Controllers */

angular.module('sarusApp.controllers', [])
    .controller('PostsController', function($scope, $location, $http, $routeParams, $element, $timeout, Feed) {
        $scope.feed = new Feed();
        $scope.feed.initial_loading(0, 10, []);
        $scope.loadMoreSlugs = function() {
            $scope.feed.load_more_feed();
        };
        $scope.loadNext = function(inview) {
            alert("ok");
        };
        // This function returns slug value from a url. Considering that the last part
        // of the url is slug from something like : http://www.foo.bar/a/b/c-this-is-slug
        // it will return: c-this-is-slug.
        // This function is used at several locations within this controller and on the UI.
        // Modify this function to return correct slug value from your urls if your urls
        // are structured differently.
        $scope.getSlug = function(str) {
            if (angular.isUndefined(str)) {
                return "";
            }
            return str.split("/").filter(function(n) {
                return n; // What is this supposed to do?
            }).reverse()[0];
        };

        // This function is used from ui directive to assign active class to the currently
        // visible post in the sidebar.
        $scope.slugClass = function(slug) {
            var cls = {
                'is-active': slug == $location.path().replace("/", "")
            };
            return cls;
        };

        // Index URL on Google.
        $scope.gaUpdate = function(title, slug) {
            ga(
                'send', 'pageview', {
                    'page': slug,
                    'title': title
                });
        };

    });

// The function below allows to filter an array of hashes
// like calling:  takeStartingAt([{slug: 'a'}, {slug: 'b'}, {slug: 'c'}, {slug: 'd'}], 'b')
// would return [{slug: 'b'}, {slug: 'c'}, {slug: 'd'}]
// More info at: http://goo.gl/8dREOz
// var takeStartingAt = function(data, start) {
//     var result = [];
//     var skip = true;
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].slug === start) {
//             skip = false;
//         }
//         if (skip) {
//             continue;
//         }
//         result.push(data[i]);
//     }
//     return result;
// };
