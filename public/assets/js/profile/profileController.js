(function() {
    'use strict'

    mainApp.controller('ProfileController', ProfileController);

    function ProfileController(ProfileService) {
        var vm = this;
        vm.firstName = '';

        ProfileService.getUserById().then(function (data) {
            if(data == null) {
                vm.loggedUser = false;
                return;
            }
            vm.user = data.data[0];
            vm.firstName = vm.user.name.split(' ')[0];
        })
        .catch(err => console.log(err));

    }
})();
