'use strict';

/* Directives */

angular.module('two1App.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).directive('repeatDone', function() {
    return function(scope, element, attrs) {
      if (scope.$last) { // all are rendered
        scope.$eval(attrs.repeatDone);
      }
    }
  }).
  directive('scrollLoad', function () {
          return function (scope, elm, attr) {
                  // Scroll should have been there instead of hover event.
                  // For some reason, scroll wasn't being detected, hence used hover function.
                  // It is essentially a hack. Need to revisit this piece.
                  //elm.on('hover', function() {

                    window.onscroll = function(ev) {
                      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        scope.$apply(attr.scrollLoad);
                      }
                    }
          }
  });
  // .directive('ngDisqus', function() {
  //   return function(scope, element, attrs) {
  //     if (scope.$last) { // all are rendered
  //     //scope.$eval(console.log(attrs.ngDisqus));
  
  //         /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
  //         var disqus_shortname  = 'srijantech'; // required: replace example with your forum shortname
  //         var disqus_identifier = attrs.didentifier;
  //         var disqus_title      = attrs.dtitle;
  //         var disqus_url        = attrs.durl;

  //         DISQUS.reset({
  //           reload: true,
  //           config: function () {  
  //             console.log(disqus_identifier);
  //             this.page.identifier = disqus_identifier;  
  //             this.page.url = disqus_url;
  //           }
  //         });

  //         // (function() {
  //         //  console.log(disqus_identifier);
  //         //     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  //         //     dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
  //         //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  //         // })();


  //         // /* * * DON'T EDIT BELOW THIS LINE * * */
  //         // (function() {
  //         //     var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
  //         //     dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
  //         //     (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  //         // }) (); 
  //     }
  //   }
  // });