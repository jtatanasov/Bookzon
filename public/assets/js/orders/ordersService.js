(function () {
    'use strict'

    mainApp.service('OrdersService', OrdersService);

    function OrdersService($http) {
        this.order = function (userId, newOrder) {
            return $http.post('/orders/' + userId, newOrder);
        }
    }
})();