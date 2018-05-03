(function () {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, $rootScope, $location, $routeParams, BooksService) {
        var vm = this;
        vm.books = [];
        vm.loading = true;
        var categories = $routeParams.category;
        loadBooks(categories);

        vm.isAdmin = false;

        if (typeof $rootScope.user != 'undefined' && $rootScope.user != null) {
            if ($rootScope.user.isAdmin) {
                vm.isAdmin = true;
            } else {
                vm.isAdmin = false;
            }
        }

        function loadBooks(categories) {
            BooksService.getBooksByCategory(categories).then(function (response) {
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