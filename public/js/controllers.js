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
  controller('BlogCtrl', function ($scope, $location, $http) {
    $scope.blogs = [];
    var counter = -1;
    $scope.loadNext = function() {      
      $http.get('/api/blogs').success(function(data) {
        console.log(counter);
        $scope.blogs.push(data[counter]);
        //$location.path('blog/'+data[counter].url);
      });
      counter+=1;
    }
    $scope.loadNext();
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
