(function () {
    'use strict'

    mainApp.service('ProfileService', ProfileService);

    function ProfileService($http, $rootScope) {
        
        this.changeName = function(name) {
            setupReq();
            return $http.put(url, {name: name});
        }

        this.changeEmail = function(email) {
            setupReq();
            return $http.put(url, {email: email});
        }

        this.changePhoneNumber = function(number) {
            setupReq();
            return $http.put(url, {mobileNumber: number});
        }

        this.changePassword = function(password) {
            setupReq();
            return $http.put(url, {password: password});
        }

        this.changeAddress = function(address) {
            return $http.put(url, {address: address});
        }

        function setupReq() {
            var userId = $rootScope.user._id;
            var url = '/users/' + userId;
        }
    }
})();