mainApp.controller('MainController', function ($scope, mainService) {
    var vm = this;
    vm.loggedUser = true;

    mainService.getUserById().then(function (data) {
        if(data == null) {
            vm.loggedUser = false;
            return;
        }
        
        vm.name = data.data[0].name;
    });

    
    vm.goToLoginPage = function($event) {
        $event.preventDefault();
        location.replace('login.html')
    }
    vm.goToSignUpPage = function($event) {
        $event.preventDefault();
        location.replace('login.html#toregister')
    }

    vm.logOut = function($event) {
        $event.preventDefault();
        mainService.logout();
        location.replace('');
    }
});