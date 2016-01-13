/// <reference path="../../../index.ts" />

module app.core {
    "use strict";

    export interface ILogger {
        error: (message: string, data?: string, title?: string) => void;
        info: (message: string, data?: string, title?: string) => void;
        success: (message: string, data?: string, title?: string) => void;
        warning: (message: string, data?: string, title?: string) => void;
        log: (message: string) => void;
    }

    export class Logger implements ILogger {
        static $inject: Array<string> = ['$log','toastr'];

        constructor(private $log: ng.ILogService, private toastr: Toastr) {
            this.log = $log.log;
        }

        log(message: string) {
            this.$log.log(message);
        }

        error(message: string, data?: string, title?: string) {
            this.toastr.error(message, title);
            this.$log.error(`Error: ${message}`, data);
        }

        info(message: string, data?: string, title?: string) {
            this.toastr.info(message, title);
            this.$log.info(`Info: ${message}`, data);
        }

        success(message: string, data?: string, title?: string) {
            this.toastr.success(message, title);
            this.$log.info(`Success: ${message}`, data);
        }

        warning(message: string, data?: string, title?: string) {
            this.toastr.warning(message, title);
            this.$log.warn(`Warning: ${message}`, data);
        }
    }

    angular
        .module("app.core")
        .service("logger", Logger);

}