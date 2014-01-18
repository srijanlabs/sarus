'use strict';

/* Directives */

angular.module('sarusApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).directive('repeatDone', function() {
    return function(scope, element, attrs) {
      if (scope.$last) { // all are rendered
        scope.$eval(attrs.repeatDone);
      }
    }
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
          }
  }).directive('spy', function() {
      return {
        restrict: "A",
        require: "^scrollSpy",
        link: function(scope, elem, attrs, affix) {
          return affix.addSpy({
            id: attrs.spy,
            "in": function() {
              return elem.addClass('current');
            },
            out: function() {
              return elem.removeClass('current');
            }
          });
        }
      };
    });