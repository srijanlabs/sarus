(function(module) {
  module.config(function($stateProvider, $injector) {
    var COMMON = $injector.get('COMMON');
    var url = COMMON.FrontEndURLPattern;
    var introState = {
      name: "intro",
      url: url,
      templateUrl: "app/controller/get.html",
      controller: "GetController as vm"
    };
    $stateProvider.state(introState);
  });
})(angular.module('sarusApp'));
