(function () {
    'use strict'

    mainApp.controller('OrderController', OrderController);

    function OrderController($rootScope, $location, OrdersService, CartService) {
        var vm = this;
        vm.tmpOrder = {
            cashPayment: true
        }
        vm.creditCard = {};
        vm.wrongCreditCardInfo = false;
        vm.wrongAccInfo = false;
        vm.isDeliveryFree = false;

        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.user = $rootScope.user;
            CartService.getCartByUserId(vm.user._id)
                .then(resp => {
                    if (resp.data[0].length == 0 || resp.data[0].books.length == 0) {
                        $location.path('/');
                    } else {
                        vm.cart = resp.data[0];
                        if (vm.cart.deliveryPrice == 0) {
                            vm.isDeliveryFree = true;
                        } else {
                            vm.isDeliveryFree = false;
                        }
                    }
                })
                .catch(err => console.log(err));
        }

        vm.saveCardInfo = function ($event) {
            $event.preventDefault();
            if (!validator.isCreditCardInfoValid(vm.creditCard)) {
                vm.wrongCreditCardInfo = true;
            } else {
                vm.wrongCreditCardInfo = false;
            }
        }

        vm.order = function () {
            vm.tmpOrder.books = vm.cart.books;
            vm.tmpOrder.totalPrice = vm.cart.totalPrice;
            if (!$rootScope.user.name || !$rootScope.user.mobileNumber || !$rootScope.user.address) {
                vm.wrongAccInfo = true;
                return;
            }
            if (!vm.tmpOrder.cashPayment) {
                if (!validator.isCreditCardInfoValid(vm.creditCard)) {
                    vm.wrongCreditCardInfo = true;
                    return;
                } else {
                    vm.tmpOrder.creditCard = vm.creditCard;
                    vm.wrongCreditCardInfo = false;
                }
            }
            
            OrdersService.order(vm.user._id, vm.tmpOrder)
            .then(resp => {
                CartService.removeAllFromCart(vm.user._id)
                .then(resp => {
                    $location.path('/orders');
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
    }
})();