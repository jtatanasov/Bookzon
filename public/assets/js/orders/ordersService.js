(function () {
    'use strict'

    mainApp.service('OrdersService', OrdersService);

    function OrdersService($http) {
        this.getOrders = function(userId) {
            return $http.get('/orders/' + userId);
        }
        this.order = function (userId, newOrder) {
            newOrder.userId = userId;
            return $http.post('/orders', newOrder);
        }

        this.getPendingOrders = function() {
            return $http.get('/orders/pending');
        }

        this.acceptOrder = function(orderId) {
            return $http.put('/orders/accept/' +orderId);
        }

        this.declineOrder = function(orderId) {
            return $http.delete('/orders/decline/' + orderId);
        }

        this.markAsDelivered = function(orderId) {
            return $http.put('/orders/delivered/' + orderId);
        }
    }
})();