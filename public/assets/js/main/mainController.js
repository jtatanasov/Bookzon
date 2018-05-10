(function () {
    'use strict'

    mainApp.controller('MainController', MainController);

    function MainController($scope, $location, $rootScope, $routeParams, $mdDialog, MainService, CartService, BooksService) {
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

        // search
        vm.search = function() {
            $location.path('/books/search').search({q: vm.keyword});
        }
        
        //admin

        vm.addNewBook = function ($event) {
            $event.preventDefault();
            $location.path('/add-book');
        }

        vm.getPendingOrders = function($event) {
            $event.preventDefault();
            $location.path('/pending-orders');
        }

        vm.deleteBook = function (id, isBookDetailsPage) {
            BooksService.deleteBook(id)
                .then(resp => {
                    if (isBookDetailsPage) {
                         // home page
                        $location.path('/');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

        vm.showConfirm = function(ev, bookId, isBookDetailsPage) {
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete this book?')
                  .targetEvent(ev)
                  .ok('Yes')
                  .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function() {
                vm.deleteBook(bookId, isBookDetailsPage);
            });
        };
    }
})();