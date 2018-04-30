(function () {
    'use strict'

    mainApp.controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, $timeout, $location, ProfileService) {
        var vm = this;
        vm.firstName = '';
        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.firstName = $rootScope.user.name.split(' ')[0];
        }


        //methods
        vm.editProfile = function () {
            $location.path('/profile/edit-profile');
        }
        vm.goToCart = function () {
            $location.path('/profile/cart');
        }
    }
})();
