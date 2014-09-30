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
        'sarusApp.factories'


    ]).config(config);
    // Route configuration below.
    function config($locationProvider) {
        // HTML5 mode Required to avoid urls with # anchor tags.
        $locationProvider.html5Mode(true);

    }




    /*IIFE Immediately Invoked Function Expression*/
}());
