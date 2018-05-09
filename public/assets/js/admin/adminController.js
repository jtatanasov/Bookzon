(function () {
    'use strict'

    mainApp.controller('AdminController', AdminController);

    function AdminController($rootScope, $timeout, $location, BooksService, OrdersService) {
        var vm = this;
        vm.newBook = {};
        vm.invalidFileType = false;

        if (!$rootScope.user || !($rootScope.user.isAdmin)) {
            location.replace('/login.html');
        }

        vm.addNewBook = function () {
            if(!vm.newBook.file || vm.newBook.file.type.split('/')[0] != 'image') {
                vm.invalidFileType = true;
                return;
            }
            BooksService.addBook(vm.newBook)
                .then(res => {
                    $location.path('/books/' + res.data.id);
                })
                .catch(err => {
                    console.log('asdf');
                });
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