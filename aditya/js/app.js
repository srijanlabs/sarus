var app = angular.module('two1App', [
  'ngRoute',
  'angular-inview',
  'two1App.controllers',
  // 'myApp.filters',
  // 'myApp.services',
  'two1App.directives',
  'ngSanitize',
  'ngLoadScript',
  'ngDisqus'

]).// Route configuration below
config(function ($routeProvider, $locationProvider, $disqusProvider) {
  window.disqus_shortname = 'srijan';
  $disqusProvider.setShortname = 'srijan';
  $locationProvider.html5Mode(true);//Required to avoid urls with # anchor tags

  $routeProvider.

    when('/:slug', {
      //templateUrl: 'partials/post',
      controller: 'PostController'
    }).
    otherwise({
      redirectTo: '/'
    });
});
