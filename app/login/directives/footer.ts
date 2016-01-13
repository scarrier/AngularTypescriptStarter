(function () {
    'use strict';

    angular
        .module('app.login')
        .directive('footer', footer);

    function footer() {
        // Usage:
        //     <footer></footer>
        // Creates:
        // 
        var directive = {
            replace: true,
            restrict: 'E',
            templateUrl: '/app/login/templates/footer.html',
            controller: ['$scope', 'settings', ($scope: ng.IScope, settings: app.models.Settings) => {
                $scope['versionNumber'] = settings.versionNumber;
            }]
        };
        return directive;
    }

})();