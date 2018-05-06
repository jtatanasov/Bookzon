(function () {
    'use strict'
    mainApp.service('MainService', MainService);

    function MainService ($http, $rootScope) {
        this.updateUser = function(updatedUser) {
            $rootScope.user = updatedUser;
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }
        this.getLoggedUser = function () {  
            if(sessionStorage.getItem('user') != 'null') {
                $http.post('/users/session', JSON.parse(sessionStorage.getItem('user')))
                .then(resp => {
                    
                })
                .catch(err => {
                    console.log(err);
                })
                return JSON.parse(sessionStorage.getItem('user'));
            } 
        }

        this.getUserNotifications = function(userId) {
            return $http.get('/notifications/' + userId);
        }

        this.seenNotification = function(userId, notificationId) {
            return $http.put('/notifications/' + userId + '/' + notificationId);
        }
        this.logout = function () {
            sessionStorage.setItem('user', null);
            return $http.get('/logout');
        }
    }
}) ();