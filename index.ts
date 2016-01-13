

/// <reference path="typings/tsd.d.ts" />

/// <reference path='./app/app.config.routes.ts'/>
/// <reference path='./app/app.module.ts'/>
/// <reference path='./app/core/app.core.config.ts'/>
/// <reference path='./app/core/app.core.constants.ts'/>
/// <reference path='./app/core/core.module.ts'/>
/// <reference path='./app/core/services/auth-interceptor-service.ts'/>
/// <reference path='./app/core/services/http-service.ts'/>
/// <reference path='./app/core/services/logger.ts'/>
/// <reference path='./app/core/services/user-state-service.ts'/>
/// <reference path='./app/login/login.module.ts'/>
/// <reference path='./app/login/controllers/login-controller.ts'/>
/// <reference path='./app/login/directives/footer.ts'/>
/// <reference path='./app/login/services/security-service.ts'/>
/// <reference path='./app/models/settings.ts'/>

interface Window {
    $: any;
    jQuery: any;
    toastr: any;
    applicationSettings: app.models.Settings;
}

window.$ = window.jQuery = require('jQuery'); //Hack to get jquery recognized globally
window.toastr = require('toastr');
var angular: ng.IAngularStatic = require('angular');
require('bootstrap');
require('angular-ui-router');
require('angular-cookies');
require('angular-ui-bootstrap');
require('angular-moment');

require('./app/app.module.ts');
require('./app/core/core.module.ts');
require('./app/login/login.module.ts');
require('./app/app.config.routes.ts');
require('./app/core/app.core.config.ts');
require('./app/core/app.core.constants.ts');
require('./app/core/services/auth-interceptor-service.ts');
require('./app/core/services/http-service.ts');
require('./app/core/services/logger.ts');
require('./app/core/services/user-state-service.ts');
require('./app/login/directives/footer.ts');
require('./app/login/services/security-service.ts');
require('./app/login/controllers/login-controller.ts');


