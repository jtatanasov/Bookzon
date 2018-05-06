(function () {
    'use strict'

    mainApp.controller('MainController', MainController);

    function MainController($scope, $location, $rootScope, $routeParams, MainService, CartService) {
        var vm = this;
        vm.loggedUser = false;
        vm.isAdmin = false;
        vm.notifications = {};

        $rootScope.user = MainService.getLoggedUser();
        if (typeof $rootScope.user != 'undefined' && $rootScope.user != null) {
            vm.loggedUser = true;
            if ($rootScope.user.isAdmin) {
                vm.isAdmin = true;
            } else {
                vm.isAdmin = false;
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

        vm.goToCart = function ($event) {
            $event.preventDefault();
            $location.path('/profile/cart');
        }

        vm.goToOrders = function ($event) {
            $event.preventDefault();
            $location.path('/profile/orders');
        }
        vm.logOut = function ($event) {
            $event.preventDefault();
            MainService.logout()
                .then(r => {
                    $rootScope.user = null;
                    vm.loggedUser = false;
                    vm.isASdmin = false;
                    $location.path('');
                })
                .catch(err => {
                    console.log(err);
                })
        }

        //admin

        vm.addNewBook = function ($event) {
            $event.preventDefault();
            $location.path('/add-book');
        }

        // search
        vm.search = function() {
            $location.path('/books/search').search({q: vm.keyword});
        }
    }
})();