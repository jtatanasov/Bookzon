(function() {
    'use strict';

    mainApp.controller('BookDetailsController', BookDetailsController);

    function BookDetailsController($routeParams, BooksService) {
        var vm = this;
        var bookId = $routeParams.bookId;
        
        BooksService.getBookById(bookId).then(function(response) {
            vm.bookDetails = response.data;
            console.log(vm.bookDetails)
        }).catch(function(err) {
            console.log(err)
        });
    }
}) ();