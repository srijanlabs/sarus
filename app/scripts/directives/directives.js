'use strict';
(function() {
    /* Directives */

    angular.module('sarusApp.directives', [])
        .directive('repeatDone', repeatDone)
        .directive('whenScrolled', whenScrolled);

    function repeatDone() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    }

    function whenScrolled() {
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
    };

}());
