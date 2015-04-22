(function() {
    'use strict';
    /* Controllers */
    angular.module('sarusApp.controllers', [])
        .controller('PostsController', PostsController);


    PostsController.$inject = ['$location', '$routeParams', '$timeout', 'Feed', '$window', 'matchmedia', '$scope'];

    function PostsController($location, $routeParams, $timeout, Feed, $window, matchmedia, $scope) {


        var redirectedFrom = true;
        var vm = this;
        vm.feed = new Feed();
        vm.sidebar_open = (window.innerWidth > 1000) ? true : false;
        vm.loadMoreSlugs = loadMoreSlugs;
        vm.navPost = navPost;
        vm.logoImage = addModule.logoImage.scr;
        vm.logoImageCss = addModule.logoImage.css;
        vm.sidebarBackground = addModule.backgroundColour.Full;
        vm.linkColor = addModule.linkColor;
        vm.linkColorActive = addModule.linkColorActive;
        vm.discussion = addModule.discussion;
        vm.facebook = addModule.socialMedia.facebook;
        vm.twitter = addModule.socialMedia.twitter;
        vm.linkedin = addModule.socialMedia.linkedin;
        vm.discussion = addModule.discussion;
        vm.headerBackground = addModule.backgroundColour.Header;
        vm.menuCollapsed = true;
        vm.menuCollapse = false;
        vm.addVisble = addVisble;
        vm.visiblePart = 0;
        // console.log(addModule.logoImage.css)
        vm.loadNextArticle = loadNextArticle;
        vm.changeUrl = changeUrl;
        vm.getSlug = getSlug;
        vm.slugClass = slugClass;
        vm.updateShareThis = updateShareThis;
        vm.gaUpdate = gaUpdate;
        vm.load_disqus = load_disqus;
        vm.disqus_sidebar = false;
        vm.body_click = body_click;
        vm.sidebar_open = false;
        vm.selectedLink = 0;
        // console.log($window, "$window")
        vm.toggleMenuIcon = toggleMenuIcon;
        // console.log("scope", $scope.$apply)
        $(window).resize(function() {
            // console.log("changed", window.innerWidth)
            $scope.$apply(function() {
                //do something to update current scope based on the new innerWidth and let angular update the view.
                // console.log("changed")
            });
        });

        vm.smallScreen = matchmedia.isPhone();
        vm.mediumScreen = matchmedia.isTablet();
        vm.largeScreen = matchmedia.isDesktop();

        var location_current = $location.path();
        if (location_current === "/") {
            vm.feed.initial_loading(0, 10, [0]); // constructor 0-10 slugs + first feed
            redirectedFrom = false;
        } else if (redirectedFrom) {
            // redirecting to a specific feed.
            vm.feed.url_to_Article(location_current.slice(1));
        }


        //////////////////////////

        function addVisble(index) {
            console.log(index);
            vm.visiblePart = index;
        }

        function loadMoreSlugs() {
            vm.feed.load_more_feed(function() {

            });
        }


        // navigation from sidebar
        function navPost(index) {
            vm.sidebar_open = false;
            vm.feed.loadSpecificArticle(index);
            vm.selectedLink = index;

        }

        function loadNextArticle(inview) {
            // The event captures via angular inview module must be of a condition where
            // the loading element has come into display and not while going out of view.
            if (inview === false) {
                return false;
            }
            vm.feed.checkAndLoadArticle();

        }
        vm.body_option_sidebar = false;

        function body_click() {
            vm.sidebar_open = false;
            if (vm.body_option_sidebar) {
                vm.body_option_sidebar = false;
                vm.disqus_sidebar = false;
            }
        }

        function toggleMenuIcon() {
            $('.menu-btn').toggleClass('is-open');
        }

        function mapUrl(url_part) {
                $location.path("/" + url_part);
                $window.document.title = url_part;
            }
            // This function allows to change current url of the browser.
            // This is required to show correct url to the user based on the post in view.
        function changeUrl(title, slug, index, inview, inviewpart) {
            // console.log(title, "fff", slug, "fff", index, "fff", inview, "fff", inviewpart)
            if (inview && inviewpart === "top") {
                mapUrl(slug);
                gaUpdate(title, slug);
                vm.selectedLink = index;
            }
        }

        function load_disqus(disqus_identifier, disqus_title, disqus_url) {
            vm.disqus_sidebar = true;
            $timeout(function() {
                vm.body_option_sidebar = true;
            }, 1000);
            vm.disqus_title = disqus_title;
            $window.disqus_shortname = 'sarus-dev';
            $window.disqus_identifier = disqus_identifier;
            $window.disqus_title = disqus_title;
            $window.disqus_url = "http://localhost:3000/" + disqus_url;
            //$window.disqus_category_id = disqus_category_id;
            // $window.disqus_disable_mobile = disqus_disable_mobile;

            // get the remote Disqus script and insert it into the DOM, but only if it not already loaded (as that will cause warnings)
            if (!$window.DISQUS) {
                var dsq = document.createElement('script');
                dsq.type = 'text/javascript';
                dsq.async = true;
                dsq.src = '//' + $window.disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            } else {
                //   console.log($window.disqus_identifier,$window.disqus_title,$window.disqus_url);
                $window.DISQUS.reset({
                    reload: true,
                    config: function() {
                        this.page.identifier = $window.disqus_identifier;
                        this.page.url = $window.disqus_url;
                        this.page.title = $window.disqus_title;

                    }
                });
            }
        }



        // When new posts are loaded as infinite scroll, social sharing buttons
        // need to be initialized. This function is called right after the ng-repeat
        // tag gets updated via the vm.posts variable.

        function updateShareThis() {
                $timeout(function() {
                    if (stButtons) {
                        stButtons.locateElements();
                    }
                }, 0);
            }
            // This function returns slug value from a url. Considering that the last part
            // of the url is slug from something like : http://www.foo.bar/a/b/c-this-is-slug
            // it will return: c-this-is-slug.
            // This function is used at several locations within this controller and on the UI.
            // Modify this function to return correct slug value from your urls if your urls
            // are structured differently.
        function getSlug(str) {
            // console.log(str)
            // if (angular.isUndefined(str)) {
            //     return "";
            // }
            // return str.split("/").filter(function(n) {
            //     return n; // What is this supposed to do?
            // }).reverse()[0];
            // console.log(str.split('/')[2].split('">')[0])
            return str.split('/')[2].split('">')[0];
        }

        // This function is used from ui directive to assign active class to the currently
        // visible post in the sidebar.
        function slugClass(slug) {
            var cls = {
                'is-active': slug === $location.path().replace('/', '')
            };
            return cls;
        }

        // Index URL on Google.
        function gaUpdate(title, slug) {
            ga(
                'send', 'pageview', {
                    'page': slug,
                    'title': title
                });
        }

    }

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


}());
