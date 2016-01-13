/// <reference path="../index.ts" />
module app {
    "use strict";

    class RouteConfig {
        static $inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

        constructor($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $urlRouterProvider.otherwise(($injector: ng.auto.IInjectorService) => {
                var $state = $injector.get('$state') as ng.ui.IStateService;
                $state.go('app.login');
            });

            $stateProvider
                .state('app', {
                    url: '/',
                    abstract: true,
                    template: '<ui-view/>'
                })
                .state('app.login', {
                    url: 'login',
                    views: {
                        'content@': {
                            templateUrl: '/app/login/templates/login.html',
                            controller: 'LoginCtrl',
                            controllerAs: 'vm'
                        }
                    }
                });
        }
    };

    angular.module("app").config(RouteConfig);

}
