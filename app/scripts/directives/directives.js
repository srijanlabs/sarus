'use strict';
(function() {
    /* Directives */

    angular.module('sarusApp.directives', [])
        .directive('repeatDone', repeatDone)
        .directive('myiscroll', myiscroll);

    function repeatDone() {
        return function(scope, element, attrs) {
            if (scope.$last) {
                // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    }

    function myiscroll() {
        return {
            scope: {
                onEnd: "&"
            },
            restrict: 'A',
            link: function($scope, iElm, iAttrs) {
                var raw = iElm[0];
                var myscroll = new IScroll(raw, {
                    scrollX: true,
                    mouseWheel: true,
                    scrollbars: true,
                    click: true
                });
                myscroll.on('scrollEnd', function() {
                    $scope.$eval($scope.onEnd);
                    myscroll.refresh();
                });
            }
        };
    };

}());
