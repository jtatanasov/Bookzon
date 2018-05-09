(function () {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, $rootScope, $location, $routeParams, $scope, $anchorScroll, $filter, BooksService) {
        var vm = this;
        var allBooks = [];
        vm.pagedBooks = [];
        vm.loading = true;
        var category = $routeParams.category;
        vm.keyword = $routeParams.q || "";
        $scope.user.keyword = vm.keyword;
        vm.sorting = {
            selectedProperty: "null",
            propertyName: "null",
            reverse: false
        };
        vm.pagination = {
            currentPage: 1,
            itemsPerPage: 12,
            totalItems: allBooks.length
        };

        loadBooks();
      
        vm.pagination.pageChanged = function() {
            var scrollToHeading = category ? 'categoryHeading' : 'searchHeading';
            scrollTo(scrollToHeading);
        };

        vm.sorting.sortBy = function(propertyName) {
            var field = propertyName.split("-")[0];
            var reverse = propertyName.split("-")[1];
            vm.sorting.reverse = (reverse == "DESC");
            vm.sorting.propertyName = field;
            allBooks = $filter('orderBy')(allBooks, vm.sorting.propertyName, vm.sorting.reverse);
            vm.pagination.currentPage = 1;
            getPaginationData();
        }

        function loadBooks() {
            /* Get books by category */
            if(category) {
                BooksService.getBooksByCategory(category).then(function (response) {
                        allBooks = $filter('orderBy')(response.data, vm.sorting.propertyName, vm.sorting.reverse);
                        getPaginationData();
                    }).catch(function (err) {
                        console.log(err);
                    }).finally(function () {
                        vm.loading = false;
                    });
            } else if (vm.keyword) {
                /* Get books by keyword (search) */
                BooksService.getBooksByKeyword(vm.keyword).then(function (response) {
                        allBooks = $filter('orderBy')(response.data, vm.sorting.propertyName, vm.sorting.reverse);
                        vm.heading = 'We found ' + response.data.length + ' results for "' + vm.keyword + '"';
                        getPaginationData();
                    }).catch(function (err) {
                        console.log(err);
                    }).finally(function () {
                        vm.loading = false;
                    });   
            } else if (vm.keyword == "") {
                /* get all books (search without a keyword) */
                BooksService.getBooks().then(function (response) {
                    allBooks = $filter('orderBy')(response.data, vm.sorting.propertyName, vm.sorting.reverse);
                    vm.heading = 'All books';
                    vm.pagination.itemsPerPage = 36;
                    getPaginationData();    
                }).catch(function (err) {
                    console.log(err);
                }).finally(function () {
                    vm.loading = false;
                });
            }
        }

        function getPaginationData() {
            vm.pagination.totalItems = allBooks.length;
            $scope.$watch(() => vm.pagination.currentPage, function (newPage) {
                var begin = ((newPage - 1) * vm.pagination.itemsPerPage);
                var end = begin + vm.pagination.itemsPerPage;
                vm.pagedBooks = allBooks.slice(begin, end);
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