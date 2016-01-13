/// <reference path="../../index.ts" />

module app.core {
    "use strict";

    angular.module('app.core')
        .config(config);
    
    config.$inject = ['$locationProvider', '$httpProvider','toastr'];
    function config($locationProvider: ng.ILocationProvider, $httpProvider: ng.IHttpProvider, toastr: Toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.closeButton = true;
        toastr.options.positionClass = "toast-top-right";
        // $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push("authInterceptorService");
    }
}
