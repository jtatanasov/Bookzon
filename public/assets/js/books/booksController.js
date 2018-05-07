(function () {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, $rootScope, $location, $routeParams, $scope, BooksService) {
        var vm = this;
        vm.books = [];
        vm.loading = true;
        var category = $routeParams.category;
        vm.keyword = $routeParams.q || "";
        $scope.user.keyword = vm.keyword;
        loadBooks();

        function loadBooks() {
            /* Get books by category */
            if(category) {
                BooksService.getBooksByCategory(category).then(function (response) {
                        vm.books = response.data;
                    }).catch(function (err) {
                        console.log(err);
                    }).finally(function () {
                        vm.loading = false;
                    });
            } else if (vm.keyword) {
                /* Get books by keyword (search) */
                BooksService.getBooksByKeyword(vm.keyword).then(function (response) {
                        vm.books = response.data;
                        vm.heading = 'We found ' + vm.books.length + ' results for "' + vm.keyword + '"';
                    }).catch(function (err) {
                        console.log(err);
                    }).finally(function () {
                        vm.loading = false;
                    });   
            } else if (vm.keyword == "") {
                /* get all books (search without a keyword) */
                BooksService.getBooks().then(function (response) {
                    vm.books = response.data;
                    vm.heading = 'All books';
                }).catch(function (err) {
                    console.log(err);
                }).finally(function () {
                    vm.loading = false;
                });
            }
        }
    }
})();