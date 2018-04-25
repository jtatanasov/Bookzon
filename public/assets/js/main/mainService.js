(function () {
    'use strict'
    mainApp.service('MainService', MainService);

    function MainService ($http) {
        this.getUserById = function (id) {
            // var id = 'null';
            // if (sessionStorage.getItem('userId')) {
            //     id = sessionStorage.getItem('userId');
            // }

            return new Promise(function (resolve, reject) {
                // if (id == 'null') {
                //     resolve(null);
                //     return;
                // }

                $http.get('/users/' + id)
                    .then(function (response) {
                        console.log(response)
                        resolve(response);
                    }).catch(function (err) {
                        reject(null);
                    });
            });
        }

        this.isUserLogged = function () {
            var id = sessionStorage.getItem('userId');
            // if (id && id != 'null') {
            //     return id;
            // }
            console.log("id:" + id)
            return id;
        }

        this.logout = function () {
            $http.get('/logout');
            sessionStorage.setItem('userId', null);
        }
    }
}) ();