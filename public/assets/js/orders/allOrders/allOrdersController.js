(function() {
    'use strict'

    mainApp.controller('AllOrdersController', AllOrdersController);

    function AllOrdersController($rootScope, OrdersService) {
        var vm = this;
        vm.orders = {};
        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.user = $rootScope.user;
            vm.userName = vm.user.name.split(' ')[0];
            OrdersService.getOrders(vm.user._id)
                .then(resp => {
                    vm.orders = resp.data.orders;
                    vm.noOrders = (typeof vm.orders == 'undefined');
                })
                .catch(err => console.log(err));
        }
    }
})();