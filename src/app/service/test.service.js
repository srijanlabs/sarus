(function(module) {
  module.service('Listing', function($http) {
    this.get = function(cb) {
      return $http.get('app/service/test.json').success(function(data) {
        if (cb) {
          cb(data)
        }
        return data;
      })
    }
  })
})(angular.module('sarusApp'));
