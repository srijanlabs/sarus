(function(module) {
  module.config(function($stateProvider) {
    var introState = {
      name: "intro",
      url: "/intro",
      templateUrl: "app/controller/get.html",
      controller: "GetController as vm"
    };
    $stateProvider.state(introState);
  });
})(angular.module('sarusApp'));
