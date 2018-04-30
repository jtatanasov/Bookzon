(function () {
    'use strict'
    mainApp.service('CartService', CartService);

    function CartService($http) {
        this.getCartByUserId = function(userId) {
            return $http.get('/carts/' + userId);
        }

        this.addToCart = function() {
            //todo
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