var userService = (function() {
    function UserService() {

    }

    // UserService.prototype.register = function(name, email, password) {
    UserService.prototype.register = function(user) {
        // var user = {
        //     name: name,
        //     email: email,
        //     password: password
        // }
        return new Promise(function (resolve, reject) {
            $.post('/register', user)
                .then(function(data) {
                    console.log(data)
                    if(data.id) {
                        resolve(data.id);
                    } else {
                        console.log(data.message);
                    }
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    }

    UserService.prototype.login = function(email, password) {
        var user = {
            email: email,
            password: password
        }

        $.post('/login', user)
            .then(function(data) {
                return data.id;
            })
            .catch(function(err) {
                throw new Error(err);
            })
    }

    UserService.prototype.getUsers = function() {
        return new Promise(function (resolve, reject) {
            $.get('/users')
                .then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    // location.replace('./login.html');
                    reject(err);
                });
        });
    }  

    // var us = new UserService();
    //us.register('Pesho', 'pesho@abv.bg', 'asdf1234');
//    us.login('pesho@abv.bg', 'asdf1234');
    return new UserService();
})();