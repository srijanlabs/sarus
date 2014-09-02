'use strict';
(function() {
    var redirectedFrom = true;
    /* Controllers */
    angular.module('sarusApp.controllers', [])
        .controller('PostsController', PostsController);


    PostsController.$inject = ['$location', '$anchorScroll', '$http', '$routeParams', '$timeout', 'Feed'];

    function PostsController($location, $anchorScroll, $http, $routeParams, $timeout, Feed) {
        var vm = this;
        vm.sidebar_class = true;
        vm.feed = new Feed();
        vm.loadMoreSlugs = loadMoreSlugs;
        vm.navPost = navPost;
        vm.loadNextArticle = loadNextArticle;
        vm.changeUrl = changeUrl;
        vm.getSlug = getSlug;
        vm.slugClass = slugClass;
        vm.updateShareThis = updateShareThis;
        vm.gaUpdate = gaUpdate;
        vm.toggle_sidebar = toggle_sidebar;
        /////////////////////////////
        var location_current = $location.path();
        if (location_current === "/") {
            vm.feed.initial_loading(0, 10, [0]); // constructor 0-10 slugs + first feed
            redirectedFrom = false;
        } else if (redirectedFrom) {
            // redirecting to a specific feed.
            vm.feed.url_to_Article(location_current.slice(1));
        }


        //////////////////////////
        var toggled_sidebar = true;

        function toggle_sidebar() {
            vm.sidebar_class = !vm.sidebar_class;
        };

        function loadMoreSlugs() {
            vm.feed.load_more_feed(function(done) {

            });
        };
        // navigation from sidebar
        function navPost(index) {
            vm.sidebar_class = true;
            vm.feed.loadSpecificArticle(index);
        };

        function loadNextArticle(inview) {
            // The event captures via angular inview module must be of a condition where
            // the loading element has come into display and not while going out of view.
            if (inview == false) {
                return false;
            }
            vm.feed.checkAndLoadArticle();

        };

        function mapUrl(url_part) {
            $location.path("/" + url_part);
        };
        // This function allows to change current url of the browser.
        // This is required to show correct url to the user based on the post in view.
        function changeUrl(title, slug, index, inview, inviewpart, articleIndex) {
            if (inview && inviewpart === "top") {
                mapUrl(slug);
            }

        };



        // When new posts are loaded as infinite scroll, social sharing buttons
        // need to be initialized. This function is called right after the ng-repeat
        // tag gets updated via the vm.posts variable.

        function updateShareThis() {
            $timeout(function() {
                if (stButtons) {
                    stButtons.locateElements();
                }
            }, 0);
        };
        // This function returns slug value from a url. Considering that the last part
        // of the url is slug from something like : http://www.foo.bar/a/b/c-this-is-slug
        // it will return: c-this-is-slug.
        // This function is used at several locations within this controller and on the UI.
        // Modify this function to return correct slug value from your urls if your urls
        // are structured differently.
        function getSlug(str) {
            if (angular.isUndefined(str)) {
                return "";
            }
            return str.split("/").filter(function(n) {
                return n; // What is this supposed to do?
            }).reverse()[0];
        };

        // This function is used from ui directive to assign active class to the currently
        // visible post in the sidebar.
        function slugClass(slug) {
            var cls = {
                'is-active': slug == $location.path().replace("/", "")
            };
            return cls;
        };

        // Index URL on Google.
        function gaUpdate(title, slug) {
            ga(
                'send', 'pageview', {
                    'page': slug,
                    'title': title
                });
        };

    };

    // The function below allows to filter an array of hashes
    // like calling:  takeStartingAt([{slug: 'a'}, {slug: 'b'}, {slug: 'c'}, {slug: 'd'}], 'b')
    // would return [{slug: 'b'}, {slug: 'c'}, {slug: 'd'}]
    // More info at: http://goo.gl/8dREOz
    var takeStartingAt = function(data, start) {
        var result = [];
        var skip = true;
        for (var i = 0; i < data.length; i++) {
            if (data[i].slug === start) {
                skip = false;
            }
            if (skip) {
                continue;
            }
            result.push(data[i]);
        }
        return result;
    };


}());
