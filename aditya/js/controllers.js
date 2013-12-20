'use strict';

var takeStartingAt = function (data, start) {
  var result = [];
  var skip = true;
  for (var i = 0; i < data.length; i++) {
    if (data[i].slug === start) {
      skip = false;
    }
    if (skip) {
      continue;
    }
    result.push(data[i]);
  }
  return result;
};

/* Controllers */
angular.module('two1App.controllers', []).controller('PostsController', function ($scope, $location, $http, $routeParams) {
    //if($location.path()!= "/"){return} // So that this code is not executed when we get a slug !!
    $scope.loadPosts = function() {
      $scope.posts = [];
        $http.defaults.useXDomain = true;
        var httpRequest = $http({
            method: 'GET',
            url: 'http://qz.local:3000/0'
        }).success(function(data, status) {
            if($location.path()!= "/"){
                var slug = $location.path().replace("/", "");
                $scope.slug = slug;
                data = takeStartingAt(data, slug)
            }
            $scope.posts.push(data);
        });
    };

    $scope.loadPosts();

    $scope.changeUrl = function(slug){
        $location.path("/"+slug)
    }

    var cnt = 0;
    $scope.loadNext = function(){
      cnt +=1;
      $http.defaults.useXDomain = true;
      var httpRequest = $http({
          method: 'GET',
          url: 'http://qz.local:3000/'+cnt,
      }).success(function(data, status) {
              $scope.posts.push(data);
      });
    };

    $scope.getSlug = function( str ) {
      return str.split( "/" ).filter(function( n ) {
        return n; // What is this supposed to do?
      }).reverse()[ 0 ];
    };

});