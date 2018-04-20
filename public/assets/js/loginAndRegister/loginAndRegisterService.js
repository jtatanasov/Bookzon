app.service('loginAndRegisterService', function ($http) {
    this.register = function (user) {
        return new Promise(function (resolve, reject) {
            $http.post('/register', user)
                .then(function (response) {
                    if (response.data.id) {
                        resolve(response.data.id);
                    } else {
                        resolve(null);
                    }
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    }

    this.login = function (user) {
        return new Promise(function (resolve, reject) {
            $http.post('/login', user)
                .then(function (response) {
                    if (response.data.id) {
                        resolve(response.data.id);
                    } else {
                        resolve(null);
                    }
                })
                .catch(function (err) {
                    throw new Error(err);
                })
        })
    }

    this.getUsers = function () {
        return new Promise(function (resolve, reject) {
            $http.get('/users')
                .then(function (response) {
                    resolve(response);
                }).catch(function (err) {
                    // location.replace('./login.html');
                    reject(err);
                });
        });
    }
});