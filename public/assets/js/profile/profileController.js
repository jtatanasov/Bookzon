(function () {
    'use strict'

    mainApp.controller('ProfileController', ProfileController);

    function ProfileController($scope, $rootScope, $timeout, ProfileService) {
        var vm = this;
        vm.firstName = '';
        
        $timeout(function () {
            $scope.$apply(function () {
            if (!$rootScope.user) {
                location.replace('/login.html');
            } else {
                vm.firstName = $rootScope.user.name.split(' ')[0];
            }
        }); 
        }, 100);
        
    }
})();
