(function () {
    'use strict';

    mainApp.service('BooksService', BooksService);

    function BooksService($http) {
        var books;
        
        this.getBooks = function () {
            return $http.get('/api/books');
        }
       
        this.getBookRating = function (bookId) {
            return $http.get('/api/books/rating/' + bookId);
        }

        this.getBooksByCategory = function (categories) {
            return $http.get('/api/books/category/' + categories);
        }

        this.getBooksByKeyword = function(keyword) {
            return $http.get('api/books/search?q=' + keyword);
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

        this.editBook = function(bookId, obj) {
            return $http.put('/api/books/' + bookId, obj);
        }
        
        this.deleteBook = function(bookId) {
            return $http.delete('/api/books/' + bookId)
        }
    }
})();