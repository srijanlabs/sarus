(function() {
    /**
     * Angular app file.
     */
    'use strict';
    angular.module('sarusApp', [
        // Define dependencies.
        'ngRoute',
        'angular-inview',
        'sarusApp.controllers',
        'sarusApp.directives',
        'ngSanitize',
        'ngLoadScript',
        'sarusApp.factories',
        'matchmedia-ng',
        'ui.bootstrap',
        'ngAnimate',
        'angularSlideables',
        'ui.router'


    ]).config(config);
    // Route configuration below.
    function config($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
        // HTML5 mode Required to avoid urls with # anchor tags.
        // $locationProvider.html5Mode(true);
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // console.log($stateProvider, "$stateProvider")
        // $stateProvider
        //     .state("home", {
        //         url: "/home",
        //         templateUrl: "/header.html"
        //     });
    }
    angular.module('sarusApp').run(run);

    function run() {

    };




    if (addModule.sarusAppadvertisement == true)
        angular.module('sarusApp')
        .requires
        .push("sarusApp.advertisement")

    if (addModule.discussion == true)
        angular.module('sarusApp')
        .requires
        .push("sarusApp.disqus")
        // console.log(angular.module('sarusApp').requires)

    /*IIFE Immediately Invoked Function Expression*/
}());
