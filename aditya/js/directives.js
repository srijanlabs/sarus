'use strict';

/* Directives */

angular.module('two1App.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).
  directive('scrollLoad', function () {
          return function (scope, elm, attr) {
                  // Scroll should have been there instead of hover event.
                  // For some reason, scroll wasn't being detected, hence used hover function.
                  // It is essentially a hack. Need to revisit this piece.
                  //elm.on('hover', function() {

                    window.onscroll = function(ev) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                scope.$apply(attr.scrollLoad);
            }
          }
        //});
          }
  });