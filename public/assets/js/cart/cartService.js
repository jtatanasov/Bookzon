(function () {
    'use strict'
    mainApp.service('CartService', CartService);

    function CartService($http) {
        function Book(bookDetails) {
            this.photoUrl = bookDetails.volumeInfo.imageLinks.smallThumbnail;
            this.name = bookDetails.volumeInfo.title;
            this.price = bookDetails.volumeInfo.price;
            this.bookId = bookDetails._id;
            this.authors = bookDetails.volumeInfo.authors;
        }
        this.getCartByUserId = function(userId) {
            return $http.get('/carts/' + userId);
        }

        this.addToCart = function(userId, bookDetails) {
            var bookToAdd = new Book(bookDetails);
            return $http.post('/carts/' + userId, bookToAdd);
        }
        this.removeAllFromCart = function(userId) {
            return $http.delete('/carts/' + userId);
        }
        this.removeBookFromCart = function(userId, bookId) {
            return $http.delete('/carts/' + userId + '/' + bookId);
        }
        this.getCarts = function() {
            return $http.get('/carts');
        }
    }

})();