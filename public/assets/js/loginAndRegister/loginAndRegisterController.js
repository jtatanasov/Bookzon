loginApp.controller('LoginAndRegisterController', function ($scope, loginAndRegisterService) {
    //login
    $scope.wrongPassword = false;
    $scope.wrongEmail = false;
    $scope.noUser = false;

    $scope.attemptingUser = {
        email: '',
        password: ''
    }
    angular.element('#email').on('focus', function () {
        $scope.wrongEmail = false;
        $scope.noUser = false;
    });

    angular.element('#password').on('focus', function () {
        $scope.wrongPassword = false;
        $scope.noUser = false;
    });

    $scope.userLogin = function ($event) {
        $event.preventDefault();

        if (!validator.isValidMail($scope.attemptingUser.email)) {
            $scope.wrongEmail = true;
            return;
        }
        if (!validator.isValidPassword($scope.attemptingUser.password)) {
            $scope.wrongPassword = true;
            return;
        }

        loginAndRegisterService.login($scope.attemptingUser)
            .then(function (data) {
                if (data == null) {
                    $scope.noUser = true;
                } else {
                    location.replace('/');
                }
            })

    }

    //register
    $scope.newUser = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    $scope.wrongSignUpEmail = false;
    $scope.wrongSignUpName = false;
    $scope.wrongSignUpPassword = false;
    $scope.wrongSignUpConfirmPassword = false;
    $scope.alreadyRegistered = false;


    angular.element('#namesignup').on('focus', function () {
        $scope.wrongSingUpName = false;
    });

    angular.element('#emailsignup').on('focus', function () {
        $scope.wrongSignUpEmail = false;
        $scope.alreadyRegistered = false;
    });

    angular.element('#passwordsignup').on('focus', function () {
        $scope.wrongSignUpPassword = false;
    });


    angular.element('#passwordsignup_confirm').on('focus', function () {
        $scope.wrongSignUpConfirmPassword = false;
    });

    $scope.userRegister = function ($event) {
        $event.preventDefault();

        if (!validator.isValidString($scope.newUser.name)) {
            $scope.wrongSignUpName = true;
            return;
        }

        if (!validator.isValidMail($scope.newUser.email)) {
            $scope.wrongSignUpEmail = true;
            return;
        }
        if (!validator.isValidPassword($scope.newUser.password)) {
            $scope.wrongSignUpPassword = true;
            return;
        }

        if ($scope.newUser.password != $scope.newUser.confirmPassword) {
            $scope.wrongSignUpConfirmPassword = true;
            return;
        }

        loginAndRegisterService.register($scope.newUser)
        .then(function(data) {
            $scope.wrongSignUpConfirmPassword = false;
            if(data == null) {
                $scope.alreadyRegistered = true;
            } else {
                location.replace('#tologin');
            }
        })
    }

    $scope.users = loginAndRegisterService.getUsers().then(function (data) {
        // console.log(data.data);
    });
});
