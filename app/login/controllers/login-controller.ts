/// <reference path="../../../index.ts" />
namespace app.login {
    "use strict";

    export interface ILoginCtrl {
        userName: string;
        password: string;
        login: () => void;
        showInvalidUserMessage: boolean;
        displaySpinner: boolean
    }

    export class LoginCtrl implements ILoginCtrl {
        userName: string;
        password: string;
        showInvalidUserMessage: boolean;
        displaySpinner: boolean;
        static $inject: Array<string> = ['$state', 'logger', 'securityService', 'userStateService', '$rootScope'];
               
        constructor(private $state: ng.ui.IStateService, private logger: core.ILogger, private securityService: ISecurityService, private userStateService: core.IUserStateService) {

        }
        
        login() {
            var vm = this;
            vm.displaySpinner = true;
            this.securityService.login(this.userName, this.password)
                .then(
                    (response: SecurityToken) => {
                        vm.userStateService.persistDataOnClient(response);
                        vm.displaySpinner = false;
                        vm.$state.go('app.dashboard');
                    },
                    (error: any) => {
                        vm.displaySpinner = false;
                        vm.showInvalidUserMessage = true;
                        vm.logger.log('Error logging in user');
                    }
                );
        }

        activate(): void {
            var vm = this;
            vm.showInvalidUserMessage = false;
            vm.displaySpinner = false;
        }

    }
    
    angular
        .module("app.login")
        .controller("LoginCtrl", LoginCtrl);
}