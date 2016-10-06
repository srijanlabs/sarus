(function(module) {
  module.factory('SarusFetch', function($http, COMMON) {
    var SarusFetch = function() {
      this.items = [];
      this.busy = false;
      this.index = 0;
    };

    SarusFetch.prototype.nextPage = function(id) {
      if (this.busy) return;
      this.busy = true;
      var url = COMMON.ServerURL + (id || '');
      $http.get(url).success(function(data) {
        this.items.push(data[0])
        this.busy = false;
        this.index++;
      }.bind(this));
    };

    return SarusFetch;
  });
})(angular.module('sarusApp'));
