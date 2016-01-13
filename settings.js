"use strict";
var settings = {
    //Put any application settings here, they will be substituted on a local build with the appSettings properties in web.config
    //On a remote build, octopus will do the substitution
    securityApiUrl: '#{SecurityApiUrl}',
    versionNumber: '1.0.0.0'
};
window.applicationSettings = settings;
