define([
    'angular'
], function(ng) {
    var controllers = ng.module('controllers', []);

    controllers.controller('MainCtrl', ['$scope', function($scope) {
        //:P
    }]);

    controllers.controller('PageNotFoundCtrl', ['$scope', function($scope) {
        $scope.$root.tabs.active = undefined;
        $scope.resultHtml = "Error 404: Page not found";
    }]);
});