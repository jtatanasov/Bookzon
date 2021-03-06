(function () {
    'use strict'

    const PENDING_ORDER = 'Pending'
    mainApp.controller('OrderController', OrderController);

    function OrderController($rootScope, $location, OrdersService, CartService) {
        var vm = this;
        vm.tmpOrder = {
            cashPayment: true,
            status: PENDING_ORDER
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

        vm.order = function () {
            vm.tmpOrder.books = vm.cart.books;
            vm.tmpOrder.totalPrice = vm.cart.totalPrice;
            if (!$rootScope.user.name || !$rootScope.user.mobileNumber || !$rootScope.user.address) {
                vm.wrongAccInfo = true;
                return;
            }
            if (!vm.tmpOrder.cashPayment) {
                console.log(vm.creditCard);
                if (!validator.isCreditCardInfoValid(vm.creditCard)) {
                    vm.wrongCreditCardInfo = true;
                    return;
                } else {
                    vm.tmpOrder.creditCard = vm.creditCard;
                    vm.wrongCreditCardInfo = false;
                }
            }

            var date = new Date();
            date = date.toString().split(' ');
            date = date[2] + ' ' + date[1] + ' ' + date[3];
            vm.tmpOrder.date = date;
            OrdersService.order(vm.user._id, vm.tmpOrder)
            .then(resp => {
                CartService.removeAllFromCart(vm.user._id)
                .then(resp => {
                    $location.path('/profile/orders');
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
    }
})();