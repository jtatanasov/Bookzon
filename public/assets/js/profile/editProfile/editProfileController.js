(function() {
    'use strict'

    mainApp.controller('EditProfileController', EditProfileController);

    function EditProfileController($rootScope, ProfileService, MainService) {
        var vm = this;
        vm.editNameMode = false;
        vm.wrongName = false;

        vm.editEmailMode = false;
        vm.wrongEmail = false;

        vm.editPhoneNumber = false;
        vm.wrongMobileNumber = false; 

        vm.editPasswordMode = false;
        vm.wrongPassword = false;

        vm.editAddressMode = false;
        vm.wrongAddress = false;

        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.name = $rootScope.user.name;
            vm.email = $rootScope.user.email;
            vm.mobileNumber = $rootScope.user.mobileNumber; 
            if(vm.mobileNumber == '' || typeof vm.mobileNumber == 'undefined') {
                vm.mobileNumber = 'No phone number added yet';
            }
            vm.address = $rootScope.user.address;
            if(vm.address == '' || typeof vm.address == 'undefined') {
                vm.address = 'No address';
            }
            vm.password = '';
            vm.confirmPassword = '';
        }

        //methods 
        vm.editName = function($event) {
            $event.preventDefault();
            vm.editNameMode = true;
        }
        vm.saveName = function($event) {
            $event.preventDefault();
            if(validator.isValidString(vm.name)) {
                ProfileService.changeName(vm.name)
                .then(resp => {
                    MainService.updateUser(resp.data);                
                })
                .catch(err => {
                    vm.wrongName = true;
                });
                
                vm.editNameMode = false;
                vm.wrongName = false;
            } else {
                vm.wrongName = true;
            }
        }

        vm.editEmail = function($event) {
            $event.preventDefault();
            vm.editEmailMode = true;
        }
        vm.saveEmail = function($event) {
            $event.preventDefault();
            if(validator.isValidMail(vm.email)) {
                ProfileService.changeEmail(vm.email)
                .then(resp => {
                    MainService.updateUser(resp.data);                
                })
                .catch(function(err) {
                    vm.wrongEmail = true;
                });
                vm.editEmailMode = false;
                vm.wrongEmail = false;
            } else {
                vm.wrongEmail = true;
            }
        }

        vm.editPhone = function($event) {
            $event.preventDefault();
            if(!validator.isValidPhoneNumber(vm.mobileNumber)) {
                vm.mobileNumber = '';
            }
            vm.editPhoneNumber = true;
        }
        vm.savePhone = function($event) {
            $event.preventDefault();
            if(validator.isValidPhoneNumber(vm.mobileNumber)) {
                ProfileService.changePhoneNumber(vm.mobileNumber)
                .then(resp => {
                    MainService.updateUser(resp.data);                
                })
                .catch(function(err) {
                    vm.wrongMobileNumber = true;
                });
                vm.editPhoneNumber = false;
                vm.wrongMobileNumber = false;
            } else {
                vm.wrongMobileNumber = true;
            }
        }

        vm.editPassword = function($event) {
            $event.preventDefault();
            vm.editPasswordMode = true;
        }
        vm.savePassword = function($event) {
            $event.preventDefault();
            if(validator.isValidPassword(vm.password) && vm.password == vm.confirmPassword) {
                ProfileService.changePassword(vm.password)
                .then(resp => {
                    MainService.updateUser(resp.data);                
                })
                .catch(function(err) {
                    vm.wrongPassword = true;
                });
                vm.editPasswordMode = false;
                vm.wrongPassword = false;
            } else {
                vm.wrongPassword = true;
            }
        }

        vm.editAddress = function($event) {
            $event.preventDefault();
            if(vm.address == 'No address') {
                vm.address = '';
            }
            vm.editAddressMode = true;
        }
        vm.saveAddress = function($event) {
            $event.preventDefault();
            if(validator.isValidString(vm.address)) {
                ProfileService.changeAddress(vm.address)
                .then(resp => {
                    MainService.updateUser(resp.data);                
                })
                .catch(function(err) {
                    vm.wrongAddress = true;
                });
                vm.editAddressMode = false;
                vm.wrongAddress = false;
            } else {
                vm.wrongAddress = true;
            }
        }
    }
})();