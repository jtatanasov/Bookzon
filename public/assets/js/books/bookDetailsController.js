(function() {
    'use strict';

    mainApp.controller('BookDetailsController', BookDetailsController);

    function BookDetailsController($routeParams, BooksService, $scope, $location, $anchorScroll) {
        var vm = this;
        var bookId = $routeParams.bookId;
        vm.rating = {};
        
        BooksService.getBookById(bookId).then(function(response) {
            vm.bookDetails = response.data;
            // temporarily using google books averageRating
            vm.rating.rate = vm.bookDetails.volumeInfo.rating ? vm.bookDetails.volumeInfo.rating : vm.bookDetails.volumeInfo.averageRating;
        }).catch(function(err) {
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
        vm.scrollTo = function(id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }
    }
}) ();