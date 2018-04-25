(function () {
    'use strict'

    mainApp.controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, $timeout, $location, ProfileService) {
        var vm = this;
        vm.firstName = '';
        // console.log($rootScope.user);
        // $timeout(function () {
        // $scope.$apply(function () {
        if (!$rootScope.user) {
            location.replace('/login.html');
        } else {
            vm.firstName = $rootScope.user.name.split(' ')[0];
        }
        // }); 
        // }, 100);

        
        //methods
        vm.editProfile = function() {
            $location.path('/profile/edit-profile');
        }
    }
})();
