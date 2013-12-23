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

var endpoint = "http://qz.local:3000"
/* Controllers */
angular.module('two1App.controllers', []).controller('PostsController', function ($scope, $location, $http, $routeParams) {
    if($location.path()!= "/"){
      endpoint = endpoint + "/offset" + $location.path();      
    }
    console.log(endpoint);
    $scope.loadPosts = function() {
      $scope.posts = [];
        $http.defaults.useXDomain = true;
        var httpRequest = $http({
            method: 'GET',
            url: endpoint+"/"+0
        }).success(function(data, status) {
            $scope.posts.push(data);
        });
    };

    $scope.loadPosts();

    var slugs = [];
    $scope.changeUrl = function(slug, index, inview, inviewpart){
      if(document.body.scrollTop == 0){return false;}
      slugs[index] = slug;
      if(inview == true){
        $location.path("/"+slug);
      }
      console.log("s: "+ slug +" v:"+inview+ " p:"+inviewpart);
      var pslug = slugs[index-1];
      if(inview == false && angular.isUndefined(pslug) == false){ // Assuming that inview false means that the current slug is going out of the view by scrolling up
        $location.path("/"+pslug);
      }
    };

    var cnt = 0;
    $scope.loadNext = function(inview){
      if(document.body.scrollTop == 0){return false;}
      if(inview == false){return false;}
      cnt +=1;
      $http.defaults.useXDomain = true;
      var httpRequest = $http({
          method: 'GET',
          url: endpoint+"/"+cnt,
      }).success(function(data, status) {
              if(data == ""){return false;}
              $scope.posts.push(data);
      });
    };

    $scope.getSlug = function( str ) {
      if(angular.isUndefined(str)){return "";}
      return str.split( "/" ).filter(function( n ) {
        return n; // What is this supposed to do?
      }).reverse()[ 0 ];
    };

});