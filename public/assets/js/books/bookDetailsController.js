(function () {
    'use strict';

    mainApp.controller('BookDetailsController', BookDetailsController);

    function BookDetailsController($routeParams, BooksService, CartService, $rootScope, $scope, $location, $anchorScroll) {
        var vm = this;
        var bookId = $routeParams.bookId;
        vm.rating = {};
        vm.isAvailable = true;
        vm.isLogged = false;
        vm.addedToCart = false;

        BooksService.getBookById(bookId).then(function (response) {
            if (!$rootScope.user) {
                vm.isLogged = false;
            } else {
                vm.userId = $rootScope.user._id;
                vm.isLogged = true;
            }

            vm.bookDetails = response.data;
            if (vm.bookDetails.volumeInfo.quantity == 0) {
                vm.isAvailable = false;
            } else {
                vm.isAvailable = true;
            }
        }).catch(function (err) {
            console.log(err);
        });

        vm.addToCart = function () {
            CartService.addToCart(vm.userId, vm.bookDetails)
                .then(resp => {
                    if(resp.data.alreadyInCart) {
                        vm.addedToCart = true;
                    } else {
                        vm.addedToCart = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
      
        vm.goToCart = function() {
            $location.path('/profile/cart');
        }
    }
})(); 