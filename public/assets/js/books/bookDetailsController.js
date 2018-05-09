(function () {
    'use strict';

    mainApp.controller('BookDetailsController', BookDetailsController);

    function BookDetailsController(BooksService, CartService, $routeParams, $rootScope, $location, $scope) {
        var vm = this;
        var bookId = $routeParams.bookId;
        vm.rating = {};
        vm.isAvailable = true;
        vm.isLogged = false;
        vm.addedToCart = false;
        vm.editQuantity = false;
        vm.editPrice = false;
        $scope.user.keyword = "";

        BooksService.getBookById(bookId).then(function (response) {
            if (!$rootScope.user) {
                vm.isLogged = false;
            } else {
                vm.userId = $rootScope.user._id;
                vm.isLogged = true;
            }
            response.data.volumeInfo.quantity = +response.data.volumeInfo.quantity;
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

        vm.editBookQuantity = function() {
            vm.editQuantity = true;
        }

        vm.editBookPrice = function() {
            vm.editPrice = true;
        }

        vm.saveBookQuantity = function($event, bookId, newQuantity) {
            $event.preventDefault();
            BooksService.editBook(bookId, {quantity: newQuantity})
            .then(resp => {
                vm.editQuantity = false;
            })
            .catch(err => {
                console.log(err);
            })
        }

        vm.saveBookPrice = function($event, bookId, newPrice) {
            $event.preventDefault();
            BooksService.editBook(bookId, {price: newPrice})
            .then(resp => {
                vm.editPrice = false;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
})(); 