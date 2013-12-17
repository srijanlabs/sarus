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

angular.module('two1App.controllers', []).
  controller('PostsController', function ($scope, $location, $http, $routeParams) {
    //if($location.path()!= "/"){return} // So that this code is not executed when we get a slug !!
    $scope.loadPosts = function() {
        var httpRequest = $http({
            method: 'POST',
            url: 'json/data.json',
            //data: mockDataForThisTest

        }).success(function(data, status) {
            if($location.path()!= "/"){
                
                var slug = $location.path().replace("/", "");
                $scope.slug = slug;
                console.log(slug);
                data = takeStartingAt(data, slug)
            }
            $scope.posts = data;


        });
    };


    $scope.loadPosts();

    $scope.changeUrl = function(slug){
        $location.path("/"+slug)
    }

}).controller('ShowController', function ($scope, $location, $routeParams) {
    $scope.slug = $location.path();
});