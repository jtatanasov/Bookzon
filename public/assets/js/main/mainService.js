(function () {
    'use strict'
    mainApp.service('MainService', MainService);

    function MainService ($http, $rootScope) {
        this.updateUser = function(updatedUser) {
            $rootScope.user = updatedUser;
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }
        this.getLoggedUser = function () {
            console.log(sessionStorage.getItem('user'));
            if(sessionStorage.getItem('user') != 'null') {
                return JSON.parse(sessionStorage.getItem('user'));
            } 
        }

       
        this.logout = function () {
            sessionStorage.setItem('user', null);
            return $http.get('/logout');
        }
    }
}) ();