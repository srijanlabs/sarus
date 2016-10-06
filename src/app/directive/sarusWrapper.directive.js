(function(angular) {
  angular.module('sarusApp')
    .directive('sarusContainer', function() {
      return {}
    })
    .directive('sarusItem', function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          item: '=',
          sarusTemplate: '@'
        },
        templateUrl: 'app/directive/sarus-item.tpl.html',
        link: function(scope, el, attrs) {}
      }
    })
})(angular)
