(function() {
    'use strict';

    mainApp.service('BooksService', BooksService);

    function BooksService($http) {
        var books;
        // this.addBook = addBook;
        // this.removeBook = removeBook;
        this.getBooks = function() {
            return $http.get('/api/books')
        }

        
        // function getBooks() {
        //     return new Promise(function (resolve, reject) {
        //         $http.get('/api/books').then(function(response) {
        //             books = response;
        //             resolve(response.data);
        //         }).catch(function (err) {
        //             reject(err);;
        //         });
        //     });
        // }
    }
}) ();