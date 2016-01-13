/// <reference path="../../../index.ts" />

namespace app.login {
    "use strict";

    export interface ISecurityService {
        user: {
            userName: string,
            password: string,
            scope: string,
            clientId: string,
            clientSecret: string,
            origin: string,
            grantType: string
        },
        login: (userName: string, password: string) => ng.IPromise<SecurityToken>;
        }
    
    export interface SecurityToken {
        access_token: string;
        expires_in?: number;
        token_type?: string;
    }


    export class SecurityService implements ISecurityService {

        user: {
            userName: string,
            password: string,
            scope: string,
            clientId: string,
            clientSecret: string,
            origin: string,
            grantType: string
        };

        static $inject: Array<string> = ['httpService', 'settings'];
        constructor(private httpService: core.IHttpService, private settings: models.Settings) {

        }

        login(userName: string, password: string) {

            var user = {
                userName: userName,
                password: password
            };

            var url = this.settings.securityApiUrl + "/token";

            var promise = this.httpService.post<SecurityToken>(url, {}, user);

            return promise;
        }
    }

    angular
        .module("app.login")
        .service("securityService", SecurityService);
}
