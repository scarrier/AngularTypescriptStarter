
exports.config = {
    //seleniumServerJar: './test/e2e/lib/selenium-server-standalone-2.48.2.jar',
    //chromeDriver: './test/e2e/lib/chromedriver.exe',
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['./test/e2e/**/*Tests.js'],
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true,
        isVerbose: true,
        realtimeFailure: true
    },
    rootElement: '[ng-app]'
};
