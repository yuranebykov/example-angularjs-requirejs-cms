define([
    'require',
    'angular',
    'underscore',
    'angularRoute',
    'angularSanitize',
    'controllers'
], function(require, ng, _) {
    'use strict';

    var routeProviderReference,
        pathDataOfTabs = '/json/tabs.json',
        directoryTabs =  '/js/tabs/';

    var app =  ng.module('app', ['ngRoute', 'ngSanitize', 'controllers']);

    app.config(['$controllerProvider', '$routeProvider', '$locationProvider',
        function($controllerProvider, $routeProvider, $locationProvider) {
            app.register = {
                controller: $controllerProvider.register
            };

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            routeProviderReference = $routeProvider;
        }]);

    app.run(['$rootScope', '$http', '$route', function($rootScope, $http, $route) {

        $http.get(pathDataOfTabs).success(function(result) {
            $rootScope.tabs = {
                data: result,
                first: _.min(result, function(elem) {return elem.order})
            };

            routeProviderReference.when('/', {
                template: '<div ng-bind-html="resultHtml"></div>',
                controller: "MainCtrl",
                resolve: {
                    load: function() {
                        window.location.href = "/" + $rootScope.tabs.first.id;
                    }
                }
            });

            _.each($rootScope.tabs.data, function(elem) {

                routeProviderReference.when('/'+elem.id, {
                    template: '<div ng-bind-html="resultHtml"></div>',
                    controller: elem.id+"Ctrl",
                    resolve: {
                        load: ['$q', '$rootScope', function($q, $rootScope) {
                            var defer = $q.defer();
                            require([directoryTabs + elem.id + '.js'], function(controller) {
                                app.register.controller(elem.id+"Ctrl", controller);
                                defer.resolve();
                            });

                            $rootScope.tabs.active = elem;
                            return defer.promise;
                        }]
                    }
                });
            });

            routeProviderReference.when('/notFound', {
                template: '<div ng-bind-html="resultHtml"></div>',
                controller: "PageNotFoundCtrl"
            });

            routeProviderReference.otherwise({
                redirectTo: '/notFound'
            });

            $route.reload();
        });
    }]);

    return app;
});