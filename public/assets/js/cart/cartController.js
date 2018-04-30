(function () {
    'use strict'

    mainApp.controller('CartController', CartController);

    function CartController($rootScope, CartService) {
        var vm = this;
        vm.cart = {};
        vm.emptyCart = true;
        vm.isDeliveryFree = false;

        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.owner = $rootScope.user.name.split(' ')[0];
        }

        var userId = $rootScope.user._id;
        getCart();
        function getCart() {
            CartService.getCartByUserId(userId)
                .then(resp => {
                    if (resp.data.length == 0 || resp.data[0].books.length == 0) {
                        vm.emptyCart = true;
                    } else {
                        vm.emptyCart = false;
                        vm.cart = resp.data[0];
                        if(vm.cart.deliveryPrice == 0) {
                            vm.isDeliveryFree = true;
                        } else {
                            vm.isDeliveryFree = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }


        //methods
        vm.removeAllFromCart = function () {
            CartService.removeAllFromCart(userId)
                .then(resp => {
                    vm.emptyCart = true;
                    getCart();
                })
                .catch(err => {
                    console.log(err);
                })
        }

        vm.removeBookFromCart = function (bookId) {
            CartService.removeBookFromCart(userId, bookId)
                .then(resp => {
                    getCart();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
})();