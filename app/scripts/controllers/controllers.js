'use strict';
(function() {

    /* Controllers */
    angular.module('sarusApp.controllers', [])
        .controller('PostsController', PostsController);


    PostsController.$inject = ['$location', '$anchorScroll', '$http', '$routeParams', '$timeout', 'Feed'];

    function PostsController($location, $anchorScroll, $http, $routeParams, $timeout, Feed) {
        var vm = this;
        vm.feed = new Feed();
        vm.feed.initial_loading(0, 10, [0]); // constructor 0-10 slugs + first feed
        vm.loadMoreSlugs = loadMoreSlugs;
        vm.navPost = navPost;
        vm.loadNextArticle = loadNextArticle;
        vm.changeUrl = changeUrl;
        vm.getSlug = getSlug;
        vm.slugClass = slugClass;
        vm.updateShareThis = updateShareThis;
        vm.gaUpdate = gaUpdate;



        //////////////////////////
        function loadMoreSlugs() {
            vm.feed.load_more_feed(function(done) {

            });
        };
        // navigation from sidebar
        function navPost(index) {
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

        // Initialize an empty array for the slugs.
        var slugs = [];
        // This function allows to change current url of the browser.
        // This is required to show correct url to the user based on the post in view.
        function changeUrl(title, slug, index, inview, inviewpart, articleIndex) {

            // if an article is too small that both top and bottom are available then load more article
            if (index && inviewpart === "both")
                vm.feed.checkAndLoadArticle(articleIndex);

            if (document.body.scrollTop == 0) {
                return false;
            }

            // The inview module detects both when an element comes in views or goes
            // out of views hence we only need to trigger the change when the
            // element comes in view.
            if (inview == true) {
                $location.path("/" + slug);
                vm.feed.checkAndLoadArticle(articleIndex);
                // Let Google know of change in post.
                gaUpdate(title, slug);
            }

            var prev = slugs[index - 1];
            // // Assuming that inview false means that the current slug is going out
            // // of the view by scrolling up.
            if (inview == false && angular.isUndefined(prev) == false && inviewpart == 'bottom') {
                // Change the browser url to the previous post slug.
                $location.path("/" + prev.slug);
            }

            // //We maintain an array of slugs viewed, so that when the user scrolls
            // // back up we change the url to the previous post.
            slugs[index] = {
                title: title,
                slug: slug
            };
            // auto scrolling to side bar to specified slug in url
            // if (slugs.length > 1) {
            //     var loc = 'sidebar-' + slug;
            //     $location.hash(loc);
            //     $anchorScroll();
            // }
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
