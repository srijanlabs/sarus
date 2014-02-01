'use strict';

/* Controllers */

angular.module('sarusApp.controllers', [])
  .controller('PostsController', function ($scope, $location, $http, $routeParams, $element, $timeout) {

  // Set the server endpoint. e.g. http://localhost:3000 or http://yourapp.nodejitsu.com
  var endpoint = $location.$$host = "http://localhost:3000";

  // We want to retain original end point as we need to modify 
  // the endpoint depending on different scenarios.
  var oEndpoint = endpoint; 

  // A global flag that can be set to allow set endpoint to 
  // re-evaluate situation and modify end point accordingly.
  $scope.slug_override = null;

  $scope.setEndpoint = function(){
    if($location.path().length > 1 || $scope.slug_override != null){
      // If a slug is passed then we change the endpoint to include
      // slug so that response is sent accordingly.
      endpoint = oEndpoint + "/offset" + ($scope.slug_override == null ?
                  $location.path() : $scope.slug_override);
      $scope.slug_override = null;
    }
  };

  // We want to set the api endpoint as soon as the application is loaded.
  $scope.setEndpoint();


  // Loading posts
  $scope.loadPosts = function() {
    // Setting up a variable with empty array. This variable is mapped
    // on the ui and will automatically render posts as soon as this
    // variable is updated with posts.
    $scope.posts = []; 
    $http.defaults.useXDomain = true;
    var httpRequest = $http({
        method: 'GET',
        // Here we are assuming that this is a basic scenario where
        // no slug is passed and we are fetching the first post from the feed.
        url: endpoint+"/"+0 
    }).success(function(data, status) {
        // Updating posts placeholder with received post.
        $scope.posts.push(data);
    });
      
  };

  // This function assigns relevant variable to make the application ready and
  // load a specific post depending on the slug passed to page.
  $scope.loadPost = function(slug){
    $scope.posts = [];
    $scope.slug_override = "/"+slug;
    $scope.setEndpoint();
    $scope.loadPosts();
    cnt = 0;
  };

  // When new posts are loaded as infinite scroll, social sharing buttons
  // need to be initialized. This function is called right after the ng-repeat
  // tag gets updated via the $scope.posts variable.
  $scope.updateShareThis = function(){
    $timeout(function() { 
      if (stButtons){stButtons.locateElements();}
     }, 0);
  };

  // This function fetches slugs from the api and renders the side bar.
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
  // First load the sidebar.
  $scope.loadTitles();
  // Then load first post on the page.
  $scope.loadPosts();
  
  // Initialize an empty array for the slugs.
  var slugs = [];

  // This function allows to change current url of the browser.
  // This is required to show correct url to the user based on the post in view.
  $scope.changeUrl = function(title, slug, index, inview, inviewpart){
    if(document.body.scrollTop == 0){return false;}
    // We maintain an array of slugs viewed, so that when the user scrolls
    // back up we change the url to the previous post.
    slugs[index] = {title: title, slug: slug};
    // The inview module detects both when an element comes in views or goes
    // out of views hence we only need to trigger the change when the 
    // element comes in view.
    if(inview == true){ 
      $location.path("/"+slug);
      // Let Google know of change in post.
      $scope.gaUpdate(title, slug);
    }
    
    var prev = slugs[index-1];
    // Assuming that inview false means that the current slug is going out 
    // of the view by scrolling up.
    if(inview == false && angular.isUndefined(prev) == false){
      // Change the browser url to the previous post slug.
      $location.path("/"+prev.slug);
    }
  };
  
  // Initialize count.
  var cnt = 0;
  // As the user scrolls down we want to emulate infinite scroll, hence
  // this function is called which maintains a counter and fetches next post
   // from the api by passing it an index value.
  $scope.loadNext = function(inview){
    // The event captures via angular inview module must be of a condition where
    // the loading element has come into display and not while going out of view.
    if(inview == false){return false;} 
    // Increase the index counter by 1.
    cnt +=1;
    $http.defaults.useXDomain = true;
    var httpRequest = $http({
        method: 'GET',
        // Appending the counter to the endpoint. this works in both the conditions
        // when a slug was passed or not. the api must be capable of handling both
        // the situations.
        url: endpoint+"/"+cnt, 
    }).success(function(data, status) {
            if(data == ""){return false;}
            // Pushing in recieved post to the list so that it is displayed below
            // all the existing posts.
            $scope.posts.push(data); 
    });

  };

  // This function returns slug value from a url. Considering that the last part 
  // of the url is slug from something like : http://www.foo.bar/a/b/c-this-is-slug
  // it will return: c-this-is-slug.
  // This function is used at several locations within this controller and on the UI.
  // Modify this function to return correct slug value from your urls if your urls
  // are structured differently.
  $scope.getSlug = function( str ) {
    if(angular.isUndefined(str)){return "";}
    return str.split( "/" ).filter(function( n ) {
      return n; // What is this supposed to do?
    }).reverse()[ 0 ];
  };

  // This function is used from ui directive to assign active class to the currently 
  // visible post in the sidebar.
  $scope.slugClass = function(slug){
    var cls = {'is-active': slug == $location.path().replace("/" , "")};
    return cls;
  };

  // Index URL on Google.
  $scope.gaUpdate = function(title, slug){
    ga(
        'send', 'pageview', {
        'page': slug,
        'title': title
    });
  };

});

// The function below allows to filter an array of hashes
// like calling:  takeStartingAt([{slug: 'a'}, {slug: 'b'}, {slug: 'c'}, {slug: 'd'}], 'b')
// would return [{slug: 'b'}, {slug: 'c'}, {slug: 'd'}]
// More info at: http://goo.gl/8dREOz
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