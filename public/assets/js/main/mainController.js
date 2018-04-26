(function () {
    'use strict'

    mainApp.controller('MainController', MainController);

    function MainController($scope, $location, $rootScope, MainService) {
        var vm = this;
        vm.loggedUser = false;

        $rootScope.user = MainService.getLoggedUser();
        if (typeof $rootScope.user != 'undefined') {
            vm.loggedUser = true;
        }


        //loggedout
        vm.goToLoginPage = function ($event) {
            $event.preventDefault();
            location.replace('login.html')
        }
        vm.goToSignUpPage = function ($event) {
            $event.preventDefault();
            location.replace('login.html#toregister')
        }


        //logedin
        vm.goToProfilePage = function ($event) {
            $event.preventDefault();
            $location.path('/profile');
        }
        vm.logOut = function ($event) {
            $event.preventDefault();
            MainService.logout();
            vm.loggedUser = false;
            location.replace('');
        }
    }
})();