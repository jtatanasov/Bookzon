app.controller('LoginAndRegisterController', function($scope, loginAndRegisterService) {
    $scope.wrongPassword = false;
    $scope.wrongEmail = false;
    $scope.noUser = false;

    $scope.attemptingUser = {
        email: '',
        password: ''
    }
    angular.element('#email').on('focus', function() {
        $scope.wrongEmail = false;
        $scope.noUser = false;
    });

    angular.element('#password').on('focus', function() {
        $scope.wrongPassword = false;
        $scope.noUser = false;
    });

    $scope.userLogin = function($event) {
        $event.preventDefault();
        
        if(!validator.isValidMail($scope.attemptingUser.email)) {
            $scope.wrongEmail = true;
            return;
        }
        if(!validator.isValidPassword($scope.attemptingUser.password)) {
            $scope.wrongPassword = true;
            return;
        }
        
        loginAndRegisterService.login($scope.attemptingUser)
        .then(function(data) {
            if(data == null) {
                $scope.noUser = true;
            } else {
                location.replace('/');
            }
        })

    }
    
    // $scope.userId = loginAndRegisterService.register(user).then(function(data) {
    //     return data;
    // });

    // $scope.logged = loginAndRegisterService.login('dancho@abv.bg', 'asdf1234').then(function(data) {
    //     console.log(data);
    // });

    $scope.users = loginAndRegisterService.getUsers().then(function(data) {
        // console.log(data.data);
    });


});