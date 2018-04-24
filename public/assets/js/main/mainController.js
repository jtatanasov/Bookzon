mainApp.controller('MainController', function ($scope, $location, $rootScope, mainService) {
    var vm = this;
    vm.loggedUser = true;
    if (!($rootScope.user)) {
        mainService.getUserById().then(function (data) {
            if (data == null) {
                vm.loggedUser = false;
                return;
            }
            $rootScope.user = data.data[0];
            sessionStorage.setItem('userId', null);
            vm.name = data.data[0].name;
        });
    }


    //loggedout
    vm.goToLoginPage = function ($event) {
        $event.preventDefault();
        location.replace('login.html')
    }
    vm.goToSignUpPage = function ($event) {
        $event.preventDefault();
        location.replace('login.html#toregister')
    }


    //logedin
    vm.goToProfilePage = function ($event) {
        $event.preventDefault();
        $location.path('/profile');
    }
    vm.logOut = function ($event) {
        $event.preventDefault();
        mainService.logout();
        location.replace('');
    }
});