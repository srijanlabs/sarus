angular.module('sarusApp')
  .controller("GetController", function(Listing, $sce, common) {
    var vm = this;
    vm.trustAsHtml = $sce.trustAsHtml;
    vm.pageNumber = 1;
    vm.numberOfRecordsPerPage = common.numberOfRecordsPerPage;
    var nids = [{
      "nid": "21700"
    }, {
      "nid": "21699"
    }, {
      "nid": "21698"
    }, {
      "nid": "21697"
    }, {
      "nid": "21696"
    }, {
      "nid": "21693"
    }, {
      "nid": "21692"
    }, {
      "nid": "21691"
    }, {
      "nid": "21690"
    }, {
      "nid": "21689"
    }, {
      "nid": "21688"
    }, {
      "nid": "21687"
    }, {
      "nid": "21686"
    }, {
      "nid": "21683"
    }, {
      "nid": "21682"
    }, {
      "nid": "21681"
    }, {
      "nid": "21680"
    }, {
      "nid": "21679"
    }, {
      "nid": "21678"
    }];
    vm.listing = [];
    vm.loadMore = function(page, count) {
      var nid = nids[page];
      Listing.get(nid, function(data) {
        vm.listing.push(data[0]);
      });
      vm.pageNumber++;
    };
    vm.loadMore(vm.pageNumber, vm.numberOfRecordsPerPage);
  });
