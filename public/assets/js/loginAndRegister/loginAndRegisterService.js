loginApp.service('loginAndRegisterService', function ($http) {
    this.register = function (user) {
        return $http.post('/register', user)
    }

    this.login = function (user) {
        return new Promise(function (resolve, reject) {
            $http.post('/login', user)
                .then(function (response) {
                    if (response.data._id) {
                        sessionStorage.setItem('user', JSON.stringify(response.data));
                        resolve(response.data);
                    } else {
                        resolve(null);
                    }
                })
                .catch(function (err) {
                    reject(err.data.message);
                })
        })
    }

});