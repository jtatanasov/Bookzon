(function () {
    'use strict'

    mainApp.controller('AdminController', AdminController);

    function AdminController($rootScope, $timeout, $location, BooksService, OrdersService) {
        var vm = this;
        vm.newBook = {};
        vm.wrongTitle = false;
        vm.wrongAuthor = false;
        vm.wrongPublisher = false;
        vm.wrongPrice = false;
        vm.wrongFile = false;
        vm.wrongCategory = false;
        vm.wrongQuantity = false;

        if (!$rootScope.user || !($rootScope.user.isAdmin)) {
            location.replace('/login.html');
        }

        angular.element('#title').on('focus', function () {
            $timeout(function () {
                vm.wrongTitle = false;
            });
        });
        angular.element('#author').on('focus', function () {
            $timeout(function () {
                vm.wrongTitle = false;
            });
        });
        angular.element('#publisher').on('focus', function () {
            $timeout(function () {
                vm.wrongPublisher = false;
            });
        });
        angular.element('#price').on('focus', function () {
            $timeout(function () {
                vm.wrongPrice = false;
            });
        });
        angular.element('#file').on('focus', function () {
            $timeout(function () {
                vm.wrongFile = false;
            });
        });
        angular.element('#quantity').on('focus', function () {
            $timeout(function () {
                vm.wrongQuantity = false;
            });
        });

        vm.addNewBook = function () {
            if (!validator.isValidString(vm.newBook.title)) {
                vm.wrongTitle = true;
                return;
            }
            if (!validator.isValidString(vm.newBook.author)) {
                vm.wrongAuthor = true;
                return;
            }

            if (!validator.isValidString(vm.newBook.category)) {
                vm.wrongCategory = true;
                return;
            }
            if (!validator.isValidString(vm.newBook.publisher)) {
                vm.wrongPublisher = true;
                return;
            }
            if (!validator.isValidNumber(vm.newBook.price)) {
                vm.wrongPrice = true;
                return;
            }
            if (vm.newBook.file == undefined) {
                vm.wrongFile = true;
                return;
            }
            if (vm.newBook.quantity < 0) {
                vm.wrongQuantity = true;
                return;
            }
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