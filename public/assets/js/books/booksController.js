(function () {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, $rootScope, $location, $routeParams, $scope, $mdDialog, BooksService) {
        var vm = this;
        vm.books = [];
        vm.loading = true;
        var category = $routeParams.category;
        vm.keyword = $routeParams.q || "";
        $scope.user.keyword = vm.keyword;
        loadBooks();

        /* mahnah isAdmin, zashtoto mojem da go vzimame direktno ot main controller-a -> user.isAdmin */

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
            } else {
                /* get all books (just in case) */
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

        vm.showConfirm = function(ev, bookId, isBookDetailsPage) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete this book?')
                //   .textContent('All of the banks have agreed to forgive you your debts.')
                //   .ariaLabel('Lucky day')
                  .targetEvent(ev)
                  .ok('Yes')
                  .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function() {
                vm.deleteBook(bookId, isBookDetailsPage);
            });
          };
    }
})();