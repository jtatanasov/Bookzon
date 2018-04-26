(function () {
    'use strict'

    mainApp.controller('AdminController', AdminController);

    function AdminController($rootScope, BooksService) {
        var vm = this;
        vm.newBook = {};

        if (!$rootScope.user || ($rootScope.user.email != 'admin@bookzon.com')) {
            location.replace('/login.html');
        }

        vm.addNewBook = function () {
            // console.log(vm.newBook.file);
            BooksService.addBook(vm.newBook);
            
        }

    }
})();