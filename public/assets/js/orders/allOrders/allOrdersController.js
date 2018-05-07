(function () {
    'use strict'
    const ACCEPTED_ORDER = 'Shipping';
    const DELIVERED_ORDER = 'Delivered';
    mainApp.controller('AllOrdersController', AllOrdersController);

    function AllOrdersController($rootScope, OrdersService) {
        var vm = this;
        vm.orders = {};
        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.user = $rootScope.user;
            vm.userName = vm.user.name.split(' ')[0];
            getOrders();
            function getOrders() {
                OrdersService.getOrders(vm.user._id)
                    .then(resp => {
                        vm.orders = resp.data;
                        if (vm.orders.length == 0) {
                            vm.noOrders = true;
                        } else {
                            vm.orders.forEach(o => {
                                if (o.status == DELIVERED_ORDER) {
                                    o.shipping = false;
                                    o.delievered = true;
                                }
                                if (o.status == ACCEPTED_ORDER) {
                                    o.shipping = true;
                                }
                            })
                        }
                    })
                    .catch(err => console.log(err));
            }
        }

        vm.markAsDelivered = function (orderId) {
            OrdersService.markAsDelivered(orderId)
                .then(resp => {
                    var order = vm.orders.find(o => o._id == orderId)
                    order.status = DELIVERED_ORDER;
                    order.shipping = false;
                    order.delievered = true;

                    getOrders();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
})();