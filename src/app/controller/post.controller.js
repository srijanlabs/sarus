(function(module) {
  module.controller('PostController', function(Listing) {
    var vm = this;
    Listing.get(function(d) {
      vm.list = d;
    })
    vm.listing = {
      header: 'some header',
      body: 'some body'
    }
  })
})(angular.module('sarusApp'));
