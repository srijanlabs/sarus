(function(module) {
  module.service('Listing',function($http){
    this.get=function(){
      return $http.get('test.json')
    }
  })
})(angular.module('app.service'));
