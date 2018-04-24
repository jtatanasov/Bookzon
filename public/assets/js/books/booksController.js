(function() {
    'use strict';

    mainApp.controller('BooksController', BooksController);

    function BooksController($http, BooksService) {
        var vm = this;
        vm.books = [];
        vm.loading = true;
        
        BooksService.getBooks().then(function(response) {
            vm.books = response.data;
        }).catch(function(err) {
            console.log(err)
        }).finally(function() {
            vm.loading = false;
        });
    }
}) ();