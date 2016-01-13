module app.core {
    'use strict';

    //If adding modules here, make sure to also add them to the index.tt file so browserify will load them
    angular.module('app.core', [
        'ngCookies', 'ui.router', 'ui.bootstrap', 'angularMoment'
    ]);
}