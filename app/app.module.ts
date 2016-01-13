/// <reference path="../index.ts" />

module app {
    "use strict";

    angular.module("app", [
        "app.core",
        "app.login"
    ]);

    angular.module('app')
        .constant('settings', window.applicationSettings);
}