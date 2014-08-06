'use strict';

/* Directives */

angular.module('sarusApp.directives', [])
    .directive('repeatDone', function() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })
    .directive('whenScrolled', function() {
        // Runs during compile
        return {
            scope: {
                whenScrolled: "&",
                scrollOffSet: "@"
            },
            restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            link: function($scope, iElm, iAttrs, controller) {
                var raw = iElm[0];
                var offset = parseInt($scope.scrollOffSet);
                iElm.bind('scroll', function() {
                    if (raw.scrollTop + raw.offsetHeight + offset >= raw.scrollHeight) {
                        $scope.$eval($scope.whenScrolled);

                    }

                });
            }
        };
    });
