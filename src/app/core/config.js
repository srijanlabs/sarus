(function(module) {
  module.config(function($locationProvider, $urlMatcherFactoryProvider) {
    $locationProvider.html5Mode(true);
    $urlMatcherFactoryProvider.strictMode(false)
  });
})(angular.module('sarusApp'));
