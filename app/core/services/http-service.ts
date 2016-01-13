/// <reference path="../../../index.ts" />

namespace app.core {
    "use strict";

    export interface IHttpService {
        get: <T>(url: string, params?: Object) => ng.IPromise<T>;
        post: <T>(url: string, params?: Object, data?: Object) => ng.IPromise<T>;
    }

    export class HttpService implements IHttpService {
        static $inject: Array<string> = ["$http", "$q"];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }

        /*
         * Handles HTTP GETs
         * <pre>
            httpService.get({
                url: 'http://example.com/get',
                params: {userId:100}
            });
         * </pre>
         */
        get<T>(url: string, params?: Object) {

            var req: ng.IRequestConfig = {
                cache: true,
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'  
                },
                url: url,
                params: params
            };

            return this.callService<T>(req);
        }

        /*
         * Handles http POSTs
         * <pre>
              httpService.post(
                   url: 'http://example.com/get',
                   data: { note: 'some note', userId: 100}
               );
         * </pre>
         */
        post<T>(url: string, params?: Object, data?: Object) {

            var req: ng.IRequestConfig = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'  
                },
                url: url,
                params: params,
                data: data
            };

            return this.callService<T>(req);
        } 

        callService<T>(request: ng.IRequestConfig) {
            var deferred = this.$q.defer<T>();

            this.$http<T>(request).then(response => {
                deferred.resolve(response.data);
            }, reason => {
                deferred.reject(reason);
            });

            return deferred.promise;
        }
    }

    angular
        .module("app.core")
        .service("httpService", HttpService);

}