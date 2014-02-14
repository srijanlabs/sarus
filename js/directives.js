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
  });