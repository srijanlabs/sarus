(function(module) {
  module.config(function($stateProvider) {
    var helloState = {
      name: 'hello',
      url: '/hello',
      templateUrl: 'app/controller/post.html',
      controller:'PostController as vm'
    };
    $stateProvider.state(helloState);
  });
})(angular.module('sarusApp'));
