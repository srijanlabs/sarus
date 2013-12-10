var app = angular.module('two1App', [
  'angular-inview',
  'two1App.controllers',
  // 'myApp.filters',
  // 'myApp.services',
  'two1App.directives'
]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
  }]);
