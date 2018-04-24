mainApp.service('mainService', function ($http) {
    this.getUserById = function () {
        var id = 'null';
        if (sessionStorage.getItem('userId')) {
            id = sessionStorage.getItem('userId');
        }
        return new Promise(function (resolve, reject) {
            // if (id == 'null') {
            //     resolve(null);
            //     return;
            // }

            $http.get('/users/' + id)
                .then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    location.replace('./login.html');
                    reject(null);
                });
        });
    }

    this.logout = function () {
        $http.get('/logout');
        sessionStorage.setItem('userId', null);
    }
});