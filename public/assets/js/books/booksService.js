(function () {
    'use strict';

    mainApp.service('BooksService', BooksService);

    function BooksService($http) {
        var books;
        // this.addBook = addBook;
        // this.removeBook = removeBook;
        this.getBooks = function () {
            return $http.get('/api/books');
        }

        this.getBookById = function (bookId) {
            return $http.get('/api/books/' + bookId);
        }


        this.addBook = function (data) {
            var fd = new FormData();
            for (var key in data) {
                fd.append(key, data[key]);
            }
            var type = data.file.type;
            console.log(data);
            $http.post('/api/books', fd, {
                transformRequest: angular.indentity,
                headers: { 'Content-type': 'multipart/form-data; boundary=something' }
            })
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            });
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