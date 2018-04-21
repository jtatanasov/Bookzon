(function() {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, BooksService) {
        var vm = this;
        vm.books = [];
        
        BooksService.getBooks().then(function(response) {
            vm.books = response.data;
        }).catch(function(err) {
            console.log(err)
        });
    }
}) ();