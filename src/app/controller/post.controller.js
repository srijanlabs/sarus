(function(module) {
  module.controller('PostController', function(Listing) {
    var vm = this;
    Listing.get(function(d) {
      vm.list = d;
    })
  })
})(angular.module('sarusApp'));
