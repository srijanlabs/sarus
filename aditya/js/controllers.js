'use strict';

// The function below allows to filter an array of hashes
// like calling:  takeStartingAt([{slug: 'a'}, {slug: 'b'}, {slug: 'c'}, {slug: 'd'}], 'b')
// would return [{slug: 'b'}, {slug: 'c'}, {slug: 'd'}]
// More info at: http://stackoverflow.com/questions/20564437/how-to-get-a-subset-from-json-using-angularjs/20564548?noredirect=1#comment30758177_20564548
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

/* Posts Controller */
angular.module('two1App.controllers', []).controller('PostsController', function ($scope, $location, $http, $routeParams, $element, $timeout) {
  // Different api end points are being used considering if a local request is being made or on a hosted instance.
  var endpoint = $location.$$host == 'localhost' ? "http://localhost:3000" : "http://two3-rss.nodejitsu.com";
  var oEndpoint = endpoint; // We want to retain original end point as we need to modify the endpoint depending on different scenarios

  $scope.slug_override = null; // a global flag that can be set to allow setendpoint to re evaluate situation and modify end point accordingly
    $scope.setEndpoint = function(){
      if($location.path().length > 1 || $scope.slug_override != null){
        // if a slug is passed then we change the endpoint to include slug so that response is sent accordingly
        endpoint = oEndpoint + "/offset" + ($scope.slug_override == null ? $location.path() : $scope.slug_override);
        $scope.slug_override = null;
      }
    };

    $scope.setEndpoint(); // We want to set the api endpoint as soon as the application is loaded


    // Loading posts
    $scope.loadPosts = function() {
      $scope.posts = []; // Setting up a variable with empty array. This variable is mapped on the ui and will automatically render posts as soon as this vairable is updated with posts
        $http.defaults.useXDomain = true;
        var httpRequest = $http({
            method: 'GET',
            url: endpoint+"/"+0 // Here we are assuming that this is a basic scenario where no slug is passed and we are fetching the first post from the feed.
        }).success(function(data, status) {
            $scope.posts.push(data); // Updating posts variable with received post.
        });
        
    };

    // This function assigns relevant variable to make the application ready and load a specific post depending on the slug passed to page.
    $scope.loadPost = function(slug){
      $scope.posts = [];
      $scope.slug_override = "/"+slug;
      $scope.setEndpoint();
      $scope.loadPosts();
      cnt = 0;
    };

    // When new posts are loaded as infinite scroll there social sharing buttons need to be initialized. This function is called right after the ng-repeat tag gets updated via the $scope.posts variable.
    $scope.updateShareThis = function(){
      $timeout(function() { 
        if (stButtons){stButtons.locateElements();}
       }, 0);
    };

    // This function fetches slugs from the api and renders the side bar
    $scope.loadTitles = function($element){
        $scope.titles = [];
        $http.defaults.useXDomain = true;
        var httpRequest = $http({
            method: 'GET',
            url: oEndpoint+"/slugs/0/10"
        }).success(function(data, status) {
            $scope.titles = data;
        });
    };
    $scope.loadTitles(); // first load the sidebar
    $scope.loadPosts();  // the load first post on the page

    var slugs = [];
    // This function allows to change the current url of the browser
    // This is required to show correct representation to the user based on the post he is viewing right now
    $scope.changeUrl = function(slug, index, inview, inviewpart){
      //console.log("s: "+ slug +" v:"+inview+ " p:"+inviewpart); // Uncomment this to debug the visibility of posts
      if(document.body.scrollTop == 0){return false;}
      slugs[index] = slug; // we maintain an array of slugs viewed, so that when the user scrolls back up we change the url to the previous post.
      if(inview == true){ // the inview module detects both when an element comes in views or goes out of views hence we only need to trigger the change when the element comes in view 
        $location.path("/"+slug);
      }
      
      var pslug = slugs[index-1];
      if(inview == false && angular.isUndefined(pslug) == false){ // Assuming that inview false means that the current slug is going out of the view by scrolling up
        $location.path("/"+pslug); // we change the browser url to the previous post slug
      }

    };

    var cnt = 0;
    // As the user scrolls down we want to emulate infinite scroll, hence this function is called which maintains a counter and fetches next post from the api by passing it an index value.
    $scope.loadNext = function(inview){
      if(inview == false){return false;} // the event captures via angular inview module must be of a condition where the loading element has come into display and not while going out of view.
      cnt +=1; // increasing the index counter by 1.
      $http.defaults.useXDomain = true;
      var httpRequest = $http({
          method: 'GET',
          url: endpoint+"/"+cnt, // Appending the counter to the endpoint. this works in both the conditions when a slug was passed or not. the api must be capable of handling both the situations.
      }).success(function(data, status) {
              if(data == ""){return false;}
              $scope.posts.push(data); // pushing in recieved post to the list so that it is displayed below all the existing posts.
      });

    };

    // This function returns slug value from a url. Considering that the last part of the url is slug 
    // from something like : http://www.foo.bar/a/b/c-this-is-slug
    // it will return: c-this-is-slug
    // this function is used at several locations within this controller and on the UI.
    // Modify this function to return correct slug value from your urls if your urls are structured differently.
    $scope.getSlug = function( str ) {
      if(angular.isUndefined(str)){return "";}
      return str.split( "/" ).filter(function( n ) {
        return n; // What is this supposed to do?
      }).reverse()[ 0 ];
    };

    // This function is used from ui directive to assign active class to the currently visible post in the sidebar.

    $scope.slugClass = function(slug){
      var cls = {'is-active': slug == $location.path().replace("/" , "")};
      return cls;
    };

});