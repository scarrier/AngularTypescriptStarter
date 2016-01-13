/// <reference path="../../../index.ts" />

module app.core {
    "use strict";

    export interface IUserStateService {
     
        getToken: () => string;
        persistDataOnClient: (data: login.SecurityToken) => void;
        clearPersistedDataOnClient: () => void;
        checkActiveSession: () => boolean;
        openWindow: (url: string, name: string) => void;
        closeWindow: (name: string) => void;
        closeAllWindows: () => void;
    }

    export class UserStateService implements IUserStateService {

        static $inject: Array<string> = ["$window", "$log", "$cookies"];

        constructor(private $window: ng.IWindowService, private $log: ng.ILogService, private $cookies: angular.cookies.ICookiesService) {

        }
       
        windows: {[name: string]:any} = [];

        USER_TOKEN = "user_token";

        persistDataOnClient(data: login.SecurityToken) {
            this.createSession(data);
            this.addCookies(data);
        }

        clearPersistedDataOnClient() {
            this.deleteSession();
            this.deleteCookies();
        }

        getToken() {
            let token = this.$window.sessionStorage.getItem(this.USER_TOKEN);
            if (!token) {
                token = this.getFromCookie();
        }
            return token;
        }

        checkActiveSession() {
            let token = this.$window.sessionStorage.getItem(this.USER_TOKEN);
            if (!token) {
                token = this.getFromCookie();
            }
            return token != null;
        }

        createSession(data: login.SecurityToken) {
            this.clearPersistedDataOnClient();
            this.$window.sessionStorage.setItem(this.USER_TOKEN, data.access_token);
        }
        
        deleteSession() {
            this.$window.sessionStorage.removeItem(this.USER_TOKEN); 
        }

                
        addCookies(data: login.SecurityToken) {
            this.$cookies.put(this.USER_TOKEN, data.access_token);
        }

        deleteCookies() {
            this.$cookies.remove(this.USER_TOKEN);
        }

        getFromCookie() {
            return this.$cookies.get(this.USER_TOKEN);
        }

        openWindow(url: string, name: string) {
            this.windows[name] = this.$window.open(url, name);
        }

        closeWindow(name: string) {
            if (this.windows[name]) {
                this.$window.open("", name).close(); //workaround for IE, have to open the window first
            }
            delete this.windows[name];
        }

        closeAllWindows() {
            for (var name in this.windows) {
                this.$window.open("", name).close(); //workaround for IE, have to open the window first
            }
            this.windows = [];
        }
    }

    angular
        .module("app.core")
        .service("userStateService", UserStateService);

}