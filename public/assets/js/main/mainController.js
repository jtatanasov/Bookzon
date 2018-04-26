(function () {
    'use strict'

    mainApp.controller('MainController', MainController);

    function MainController($scope, $location, $rootScope, MainService) {
        var vm = this;
        vm.loggedUser = false;
        vm.isAdmin = false;

        $rootScope.user = MainService.getLoggedUser();
        if (typeof $rootScope.user != 'undefined' && $rootScope.user != null) {
            vm.loggedUser = true;
            if($rootScope.user.email == 'admin@bookzon.com') {
                vm.isAdmin = true;
            }
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
            vm.isASdmin = false;
            location.replace('');
        }

        //admin

    vm.addNewBook = function($event) {
        $event.preventDefault();
        $location.path('/add-book');
    }
    }
})();