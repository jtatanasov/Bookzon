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
            $http.get('/logout');
            sessionStorage.setItem('user', null);
        }
    }
}) ();