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

    var slugs = [];
    $scope.changeUrl = function(slug, index, inview, inviewpart){
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
      if(inview == false){return false;}
      cnt +=1;
      $http.defaults.useXDomain = true;
      var httpRequest = $http({
          method: 'GET',
          url: 'http://qz.local:3000/'+cnt,
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