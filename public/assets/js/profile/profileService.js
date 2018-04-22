(function () {
    'use strict'

    mainApp.service('ProfileService', ProfileService);

    function ProfileService($http) {
        this.getUserById = function () {
            var id = 'null';
            if (sessionStorage.getItem('userId')) {
                id = sessionStorage.getItem('userId');
            }
            if(id == 'null') {
                return null;
            }
            return $http.get('/users/' + id);
        }
            
    
        //     return new Promise(function (resolve, reject) {
        //         if (id == 'null') {
        //             resolve(null);
        //             return;
        //         }
        //         $http.get('/users/' + id)
        //             .then(function (response) {
        //                 resolve(response);
        //             }).catch(function (err) {
        //                 // location.replace('./login.html');
        //                 reject(err);
        //             });
        //     });
        // }
    }
})();