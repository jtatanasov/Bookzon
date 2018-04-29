(function () {
    'use strict'
    mainApp.service('MainService', MainService);

    function MainService ($http) {
        this.getLoggedUser = function () {
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