(function () {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, $rootScope, $location, BooksService) {
        var vm = this;
        vm.books = [];
        vm.loading = true;
        loadBooks();

        vm.isAdmin = false;

        if (typeof $rootScope.user != 'undefined' && $rootScope.user != null) {
            if ($rootScope.user.email == 'admin@bookzon.com') {
                vm.isAdmin = true;
            } else {
                vm.isAdmin = false;
            }
        }

        function loadBooks() {
            BooksService.getBooks().
                then(function (response) {
                    vm.books = response.data;
                }).catch(function (err) {
                    console.log(err)
                }).finally(function () {
                    vm.loading = false;
                });
        }

        vm.deleteBook = function (id, isBookDetailsPage) {
            BooksService.deleteBook(id)
                .then(resp => {
                    if (isBookDetailsPage) {
                        $location.path('/books');
                    }
                    loadBooks();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
})();