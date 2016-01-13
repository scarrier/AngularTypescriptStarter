/// <reference path="../../index.ts" />
/* global toastr:false */
module app.core {
    "use strict";

    angular.module('app.core')
        .constant('toastr', toastr);
}