(function(module) {
  module.config(function($stateProvider){
    var introState = {
      name: "intro",
      url: "/intro",
      templateUrl: "app/controller/get.html",
      controller: "GetController as gc"
    };
    $stateProvider.state(introState);
  });
})(angular.module('sarusApp'));
