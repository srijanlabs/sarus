(function(angular) {
  angular.module('sarusApp').directive('updateUrl', function($window, $state,
    COMMON) {
    var currentState = $state.current;
    var stateName = currentState && currentState.name;
    var query = COMMON.query;
    var obj = {};
    return {
      restrict: 'A',
      scope: {
        updateUrl: '@'
      },
      link: function(scope, el, attr) {
        // var lastScrollTop = 0;
        angular.element($window).bind("scroll", function(e) {
          var r = el[0].getBoundingClientRect();
          var top = r.top;
          var elIn = (top >= 0 && top <= $window.innerHeight);
          scope.$apply();
          if (elIn) {
            obj[query] = scope.updateUrl;
            $state.transitionTo(stateName, obj, {
              location: true,
              notify: false,
              reload: false
            })
          }
        });
      }
    };
  });
})(angular);
