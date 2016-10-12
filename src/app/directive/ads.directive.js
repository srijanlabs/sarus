(function(angular) {
  angular.module('sarusApp').directive('ads', function(adInfo) {
    return {
      restrict: 'A',
      scope: {
        adClientId: '@',
        adSlotId: '@',
        adSize: '@'
      },
      templateUrl: 'app/directive/ads.tpl.html',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            var containerId = "div-gpt-ad-" + scope.$id;
            var adSize = JSON.parse(scope.adSize) || [300, 200];
            var el = tElement[0].firstChild;
            if (el) {
              el.id = containerId;
            }
            googletag.cmd.push(function() {
              var adSlot1 = googletag.defineSlot(
                adInfo.networkCode, adSize,
                containerId
              ).addService(googletag.pubads());
              googletag.pubads().enableSingleRequest();
              googletag.enableServices();
            });
            googletag.cmd.push(function() {
              googletag.display(containerId);
            });
          },
        }
      },
    };
  });
})(angular);
