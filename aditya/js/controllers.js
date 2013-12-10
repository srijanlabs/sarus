'use strict';

/* Controllers */

angular.module('two1App.controllers', []).
  controller('PostsController', function ($scope, $location, $http) {

    $scope.loadPosts = function() {
        var httpRequest = $http({
            method: 'POST',
            url: 'json/data.json',
            //data: mockDataForThisTest

        }).success(function(data, status) {
            $scope.posts = data;
        });
    };


    $scope.loadPosts();

    $scope.changeUrl = function(slug){
        $location.path("/"+slug)
    }

});