(function () {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, $rootScope, $location, $routeParams, $scope, $anchorScroll, BooksService) {
        var vm = this;
        vm.books = [];
        vm.loading = true;
        var category = $routeParams.category;
        vm.keyword = $routeParams.q || "";
        $scope.user.keyword = vm.keyword;
        loadBooks();
        vm.pagination = {
            currentPage: 1,
            itemsPerPage: 18,
            totalItems: vm.books.length
        };
      
        vm.pagination.pageChanged = function() {
            var heading = category ? 'categoryHeading' : 'searchHeading';
            scrollTo(heading);
        };

        function loadBooks() {
            /* Get books by category */
            if(category) {
                BooksService.getBooksByCategory(category).then(function (response) {
                        vm.books = response.data;
                        updatePaginationInfo();
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
                        updatePaginationInfo();
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
                    updatePaginationInfo();
                    vm.pagination.itemsPerPage = 36;
                }).catch(function (err) {
                    console.log(err);
                }).finally(function () {
                    vm.loading = false;
                });
            }
        }

        function updatePaginationInfo() {
            vm.pagination.totalItems = vm.books.length;
            $scope.$watch(() => vm.pagination.currentPage, function (newPage) {
                var begin = ((newPage - 1) * vm.pagination.itemsPerPage);
                var end = begin + vm.pagination.itemsPerPage;
                vm.filteredBooks = vm.books.slice(begin, end);
            });
        }

        /* Scroll to Function */
        function scrollTo(id) {
            console.log(id)
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }
    }
})();