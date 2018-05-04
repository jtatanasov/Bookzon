loginApp.controller('LoginAndRegisterController', function ($scope, loginAndRegisterService) {
    //login
    $scope.noUser = false;

    $scope.attemptingUser = {
        email: '',
        password: ''
    }

    $scope.userLogin = function ($event) {
        $event.preventDefault();

        loginAndRegisterService.login($scope.attemptingUser)
            .then(function (data) {
                if (data == null) {
                    $scope.$apply(function () {
                        $scope.noUser = true;
                    });
                } else {
                    location.replace('/');
                }
            })
            .catch(function (err) {
                $scope.$apply(function () {
                    $scope.noUser = true;
                });
            })

    }

    //register
    $scope.newUser = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    $scope.alreadyRegistered = false;

    $scope.userRegister = function ($event) {
        $event.preventDefault();
        loginAndRegisterService.register($scope.newUser)
            .then(function (data) {
                location.replace('#tologin');
            })
            .catch(err => {
                $scope.alreadyRegistered = true;
            })
    }

});
