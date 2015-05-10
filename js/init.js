define([
    'angular',
    'app'
], function(ng) {
    'use strict';

    angular.element(document).ready(function() {
        ng.bootstrap(document, ['app']);
    });
});