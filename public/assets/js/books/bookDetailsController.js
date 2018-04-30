(function () {
    'use strict';

    mainApp.controller('BookDetailsController', BookDetailsController);

    function BookDetailsController($routeParams, BooksService, CartService, $rootScope, $scope, $location, $anchorScroll) {
        var vm = this;
        var bookId = $routeParams.bookId;
        vm.rating = {};
        vm.isAvailable = true;
        vm.isLogged = false;

        
        BooksService.getBookById(bookId).then(function (response) {
            if (!$rootScope.user) {
                vm.isLogged = false;
            } else {
                vm.isLogged = true;
            }
    
            vm.bookDetails = response.data;
            if (vm.bookDetails.volumeInfo.quantity == 0) {
                vm.isAvailable = false;
            } else {
                vm.isAvailable = true;
            }
            // temporarily using google books averageRating
            vm.rating.rate = vm.bookDetails.volumeInfo.rating ? vm.bookDetails.volumeInfo.rating : vm.bookDetails.volumeInfo.averageRating;
        }).catch(function (err) {
            console.log(err);
        });

        // vm.bookRating = function ($scope) {
        // vm.rating.rate = vm.bookDetails.volumeInfo.rating;
        // vm.rating.max = 5;
        // vm.rating.isReadonly = true;

        // vm.rating.hoveringOver = function(value) {
        //     vm.rating.overStar = value;
        //     vm.rating.percent = 100 * (value / vm.rating.max);
        // };

        // }

        /* Scroll to Customer Reviews Section */
        vm.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }


        vm.addToCart = function() {
            CartService.addToCart();
        }
    }
})();