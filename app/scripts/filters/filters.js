'use strict';

/* Controllers */

angular.module('sarusApp.filters', [])
    .filter('filterFeeds', function() {
        return function(arr) {
            return arr.filter(function(el) {
                return el.available == true;
            });
        };
    });
