(function () {
    'use strict'

    mainApp.controller('AdminController', AdminController);

    function AdminController($rootScope, $timeout, $location, BooksService, OrdersService) {
        var vm = this;
        vm.newBook = {};

        if (!$rootScope.user || !($rootScope.user.isAdmin)) {
            location.replace('/login.html');
        }

        vm.addNewBook = function () {
            BooksService.addBook(vm.newBook)
                .then(res => {
                    $location.path('/books/' + res.data.id);
                })
                .catch(err => console.log(err));
        }

        getPendingOrders();
        function getPendingOrders() {
            OrdersService.getPendingOrders()
                .then(resp => {
                    vm.pendingOrders = resp.data;
                })
                .catch(err => {
                    console.log(err);
                })
        }

        vm.acceptOrder = function (orderId) {
            OrdersService.acceptOrder(orderId)
                .then(resp => {
                    getPendingOrders();
                })
                .catch(err => {
                    console.log(err);
                })
        }


        vm.declineOrder = function (orderId) {
            OrdersService.declineOrder(orderId)
            .then(resp => {
                getPendingOrders();
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
})();