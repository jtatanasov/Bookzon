(function () {
    'use strict'

    mainApp.service('OrdersService', OrdersService);

    function OrdersService($http) {
        this.getOrders = function(userId) {
            return $http.get('/orders/' + userId);
        }
        this.order = function (userId, newOrder) {
            return $http.post('/orders/' + userId, newOrder);
        }
    }
})();