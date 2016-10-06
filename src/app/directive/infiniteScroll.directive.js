(function(angular) {
  angular.module('sarusApp')
    .directive('infiniteScroll', function(
      $window, $timeout) {
      return {
        scope: {
          callback: '&infiniteScroll',
          distance: '=infiniteScrollDistance',
          disabled: '=infiniteScrollDisabled'
        },
        link: function(scope, elem, attrs) {
          var win = angular.element($window);

          var onScroll = function(oldValue, newValue) {
            if (scope.disabled) {
              return;
            }
            var windowHeight = win[0].innerHeight;
            var elementBottom = elem[0].offsetTop + elem[0].offsetHeight;
            var windowBottom = windowHeight + (win[0].scrollY || win[
              0].pageYOffset);
            var remaining = elementBottom - windowBottom;
            var shouldGetMore = (remaining - parseInt(scope.distance ||
              0, 10) <= 0);

            if (shouldGetMore) {
              $timeout(scope.callback);
            }
          };

          scope.$watch('disabled', function(isDisabled) {
            if (false === isDisabled) onScroll();
          });

          win.bind('scroll', onScroll);
          scope.$on('$destroy', function() {
            win.unbind('scroll', onScroll);
          });
          $timeout(onScroll);
        }
      };
    });

})(angular)
