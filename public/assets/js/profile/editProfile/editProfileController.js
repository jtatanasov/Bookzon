(function () {
    'use strict'

    mainApp.controller('EditProfileController', EditProfileController);

    function EditProfileController($rootScope, ProfileService, MainService) {
        var vm = this;
        vm.editNameMode = false;
        vm.editEmailMode = false;
        vm.editPhoneNumber = false;
        vm.editPasswordMode = false;
        vm.editAddressMode = false;

        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.name = $rootScope.user.name;
            vm.email = $rootScope.user.email;
            vm.mobileNumber = $rootScope.user.mobileNumber;
            if (vm.mobileNumber == '' || typeof vm.mobileNumber == 'undefined') {
                vm.mobileNumber = 'No phone number added yet';
            }
            vm.address = $rootScope.user.address;
            if (vm.address == '' || typeof vm.address == 'undefined') {
                vm.address = 'No address';
            }
            vm.password = '';
            vm.confirmPassword = '';
        }

        //methods 
        vm.editName = function ($event) {
            $event.preventDefault();
            vm.editNameMode = true;
        }
        vm.saveName = function ($event) {
            $event.preventDefault();
            ProfileService.changeName(vm.name)
                .then(resp => {
                    MainService.updateUser(resp.data);
                })
                .catch(err => {
                    console.log(err);
                });

            vm.editNameMode = false;
        }

        vm.editEmail = function ($event) {
            $event.preventDefault();
            vm.editEmailMode = true;
        }
        vm.saveEmail = function ($event) {
            $event.preventDefault();
            ProfileService.changeEmail(vm.email)
                .then(resp => {
                    MainService.updateUser(resp.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
            vm.editEmailMode = false;
        }

        vm.editPhone = function ($event) {
            $event.preventDefault();
            if (!validator.isValidPhoneNumber(vm.mobileNumber)) {
                vm.mobileNumber = '';
            }
            vm.editPhoneNumber = true;
        }
        vm.savePhone = function ($event) {
            $event.preventDefault();
            ProfileService.changePhoneNumber(vm.mobileNumber)
                .then(resp => {
                    MainService.updateUser(resp.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
            vm.editPhoneNumber = false;
        }

        vm.editPassword = function ($event) {
            $event.preventDefault();
            vm.editPasswordMode = true;
        }
        vm.savePassword = function ($event) {
            $event.preventDefault();
            ProfileService.changePassword(vm.password)
                .then(resp => {
                    MainService.updateUser(resp.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
            vm.editPasswordMode = false;
        }

        vm.editAddress = function ($event) {
            $event.preventDefault();
            if (vm.address == 'No address') {
                vm.address = '';
            }
            vm.editAddressMode = true;
        }
        vm.saveAddress = function ($event) {
            $event.preventDefault();
            ProfileService.changeAddress(vm.address)
                .then(resp => {
                    MainService.updateUser(resp.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
            vm.editAddressMode = false;
        }
    }
})();