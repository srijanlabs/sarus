(function() {
    /* Directives */
    'use strict';

    angular.module('sarusApp.disqus', [])
        .directive('disqusDir', disqusDir);

    function disqusDir() {
        return {
            scope: {
                hit: "&"
            }, // {} = isolate, true = child, false/undefined = no change
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, iElm) {
                iElm.bind('click', function() {
                    var x = document.getElementById('remove_disqus');
                    if (x) {
                        x.parentElement.innerHTML = '<disqus-dir hit="vm.load_disqus(post.index,post.title,url)">   <div class="share_icon"><a>Comment</a></div></disqus-dir>';
                    }
                    this.innerHTML = "<div id='remove_disqus' ><div id='disqus_thread' > </div> </div>";
                    $scope.$eval($scope.hit);
                });
            }
        };
    }






    angular.module('sarusApp.directives', [])
        .directive('repeatDone', repeatDone)
        .directive('myiscroll', myiscroll);



    function repeatDone() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        };
    }
    myiscroll.inject = ['$timeout'];

    function myiscroll($timeout) {
        return {
            scope: {
                onEnd: "&"
            },
            restrict: 'A',
            link: function($scope, iElm) {
                var raw = iElm[0];
                $timeout(function() {
                    var myscroll = new IScroll(raw, {
                        scrollX: true,
                        mouseWheel: true,
                        scrollbars: true,
                        click: true
                    });
                    if ($scope.onEnd) {
                        myscroll.on('scrollEnd', function() {
                            $scope.$eval($scope.onEnd);
                            $timeout(function() {
                                myscroll.refresh();
                            }, 700);
                        });
                    }
                }, 100);

            }
        };
    }

    // 
    // 
    angular.module('sarusApp.advertisement', [])
        .directive('googleAds', googleAds)
        .directive('googleAdsense', googleAdsense);
    var adSenseTpl = '<ins class="adsbygoogle responsive-ad" style="display:inline-block;" data-ad-client="ca-pub-1615310408372741" data-ad-slot="3029306310"></ins>';
    var adSenseTpl2 = '<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-1615310408372741" data-ad-slot="7644951513"></ins>';

    function googleAds($window, $compile) {
        return {
            restrict: 'A',
            transclude: true,
            template: adSenseTpl2,
            replace: false,
            link: function postLink(scope, element, iAttrs) {
                element.html("");
                element.append(angular.element($compile(adSenseTpl2)(scope)));
                if (!$window.adsbygoogle) {
                    $window.adsbygoogle = [];
                }
                // $window.adsbygoogle.push({});
                (window.adsbygoogle || []).push({});
            }
        };
    }

    function googleAdsense($window, $rootScope, $compile) {
        return {
            restrict: 'A',
            transclude: true,
            template: adSenseTpl,
            replace: false,
            link: function postLink(scope, element, iAttrs) {
                if (iAttrs.small === "true") {
                    $rootScope.$on("$locationChangeSuccess", function() {
                        //delete $window.adsbygoogle;
                        element.html("");
                        element.append(angular.element($compile(adSenseTpl)(scope)));
                        if (!$window.adsbygoogle) {
                            $window.adsbygoogle = [];
                        }
                        // $window.adsbygoogle.push({});
                        (window.adsbygoogle || []).push({});

                    });
                } else {
                    element.html("");
                    element.append(angular.element($compile(adSenseTpl)(scope)));
                    if (!$window.adsbygoogle) {
                        $window.adsbygoogle = [];
                    }
                    // $window.adsbygoogle.push({});
                    (window.adsbygoogle || []).push({});

                }


            }
        };
    }


    angular.module('angularSlideables', [])
        .directive('slideable', function() {
            return {
                restrict: 'C',
                compile: function(element, attr) {
                    // wrap tag
                    var contents = element.html();
                    element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

                    return function postLink(scope, element, attrs) {
                        // default properties
                        attrs.duration = (!attrs.duration) ? '.5s' : attrs.duration;
                        attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                        element.css({
                            'overflow': 'hidden',
                            'height': '0px',
                            'transitionProperty': 'height',
                            'transitionDuration': attrs.duration,
                            'transitionTimingFunction': attrs.easing
                        });
                    };
                }
            };
        })
        .directive('slideToggle', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                   // console.log(attrs.slideToggle)
                    var target = document.querySelector(attrs.slideToggle);
                     console.log(target)
                    attrs.expanded = false;
                    element.bind('click', function() {
                        var content = target.querySelector('.slideable_content');
                        if (!attrs.expanded) {
                            content.style.border = '1px solid rgba(0,0,0,0)';
                            var y = content.clientHeight;
                            content.style.border = 0;
                            target.style.height = y + 'px';
                        } else {
                            target.style.height = '0px';
                        }
                        attrs.expanded = !attrs.expanded;
                    });
                }
            }
        });

}());
