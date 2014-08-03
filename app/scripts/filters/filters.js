'use strict';

/* Controllers */

angular.module('sarusApp.filters', [])
    .filters('filterFeeds', function() {
        return function(arr) {
            return arr;
        };
    });
