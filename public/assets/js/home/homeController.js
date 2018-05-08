(function () {
    'use strict'

    mainApp.controller('HomeController', HomeController);

    function HomeController(HomeService, $scope) {
        var vm = this;
        vm.topRatedBooks = [];
        loadTopRated();
        $scope.user.keyword = "";
               
        function loadTopRated() {
            HomeService.getTopRatedBooks().then(function (response) {
                vm.topRatedBooks = response.data;
            }).catch(function (err) {
                console.log(err);
            });
        }

    }
})();
