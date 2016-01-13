/// <reference path="../../../index.ts" />
module app.core {
    "use strict";

    class AuthInterceptorService implements ng.IHttpInterceptor {

        static $inject: string[] = ["userStateService"];
        constructor(private userStateService: IUserStateService) {

        }

        public request = (config: ng.IRequestConfig) => {
            config.headers = config.headers || {};
            if (this.userStateService.checkActiveSession()) {
                config.headers['Authorization'] = `Bearer ${this.userStateService.getToken()}`;
            }
            return config;
        }
    
    }

angular
    .module("app.core")
    .service("authInterceptorService", AuthInterceptorService);

}