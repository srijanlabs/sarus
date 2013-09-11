'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('BlogCtrl', function ($scope, $rootScope, $location, $http) {
    // Get data from JSON.
    $http.get('/api/blogs').success(function(data) {
      $scope.blogs = data[0];
      console.log(data[0]);
    
      // Scroll to set alert
      window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          $scope.blogs = data[1]
          $scope.$apply();
        }
      };
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
