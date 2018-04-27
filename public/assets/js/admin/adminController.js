(function () {
    'use strict'

    mainApp.controller('AdminController', AdminController);

    function AdminController($rootScope, $timeout, $location, BooksService) {
        var vm = this;
        vm.newBook = {};
        vm.wrongTitle = false;
        vm.wrongAuthor = false;
        vm.wrongPublisher = false;
        vm.wrongPrice = false;
        vm.wrongFile = false;
        vm.wrongCategory = false;

        if (!$rootScope.user || ($rootScope.user.email != 'admin@bookzon.com')) {
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

        vm.addNewBook = function () {
            if(!validator.isValidString(vm.newBook.title)) {
                vm.wrongTitle = true;
                return;
            }
            if(!validator.isValidString(vm.newBook.author)) {
                vm.wrongAuthor = true;
                return;
            }
            
            if(!validator.isValidString(vm.newBook.category)) {
                vm.wrongCategory = true;
                return;
            }
            if(!validator.isValidString(vm.newBook.publisher)) {
                vm.wrongPublisher = true;
                return;
            }
            if(!validator.isValidNumber(vm.newBook.price)) {
                vm.wrongPrice = true;
                return;
            }
            if(vm.newBook.file == undefined) {
                vm.wrongFile = true;
                return;
            }
            BooksService.addBook(vm.newBook)
            .then(res => {
                $location.path('/books/' + res.data.id);
            })
            .catch(err => console.log(err));
        }

    }
})();