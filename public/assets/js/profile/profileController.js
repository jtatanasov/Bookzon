(function () {
    'use strict'

    mainApp.controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, ProfileService) {
        var vm = this;
        vm.firstName = '';
        setTimeout(function () {
            if (!$rootScope.user) {
                location.replace('/login.html');
            }
        }, 0);
        vm.firstName = $rootScope.user.name.split(' ')[0];
    }
})();
