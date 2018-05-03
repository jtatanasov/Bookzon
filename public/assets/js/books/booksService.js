(function () {
    'use strict';

    mainApp.service('BooksService', BooksService);

    function BooksService($http) {
        var books;
        
        this.getBooks = function () {
            return $http.get('/api/books');
        }

        this.getBooksByCategory = function (categories) {
            return $http.get('/api/books/category/' + categories);
        }

        this.getBookById = function (bookId) {
            return $http.get('/api/books/' + bookId);
        }


        this.addBook = function (data) {
            var fd = new FormData();
            for (var key in data) {
                fd.append(key, data[key]);
            }
            return $http.post('/api/books', fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-type': undefined}
            });
        }

        this.deleteBook = function(bookId) {
            return $http.delete('/api/books/' + bookId)
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
})();