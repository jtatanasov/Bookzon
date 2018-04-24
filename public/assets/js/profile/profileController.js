(function () {
    'use strict'

    mainApp.controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, ProfileService) {
        var vm = this;
        vm.firstName = '';

        vm.firstName = $rootScope.user.name.split(' ')[0];
    }
})();
