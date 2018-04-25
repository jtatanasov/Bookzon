(function () {
    'use strict'

    mainApp.service('ProfileService', ProfileService);

    function ProfileService($http, $rootScope) {
        
        var userId = $rootScope.user._id;
        var url = '/users/' + userId;
        this.changeName = function(name) {
            return $http.put(url, {name: name});
        }

        this.changeEmail = function(email) {
            return $http.put(url, {email: email});
        }

        this.changePhoneNumber = function(number) {
            return $http.put(url, {mobileNumber: number});
        }

        this.changePassword = function(password) {
            return $http.put(url, {password: password});
        }

        this.changeAddress = function(address) {
            return $http.put(url, {address: address});
        }
    }
})();