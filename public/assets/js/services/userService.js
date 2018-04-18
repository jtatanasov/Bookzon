var userService = (function() {
    function UserService() {

    }

    UserService.prototype.register = function(name, email, password) {
        var user = {
            name: name,
            email: email,
            password: password
        }

        $.post('/register', user)
        .then(function(data) {
            if(data.id) {
                return data.id;
            } else {
                console.log(data.message);
            }
        })
        .catch(function(err) {
            throw new Error(err);
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

    var us = new UserService();
    //us.register('Pesho', 'pesho@abv.bg', 'asdf1234');
   us.login('pesho@abv.bg', 'asdf1234');
})();