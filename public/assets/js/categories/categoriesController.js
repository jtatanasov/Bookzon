(function () {
    'use strict';

    mainApp.controller('CategoriesController', CategoriesController);

    function CategoriesController(CategoriesService, $scope, $routeParams) {
        var vm = this;
        vm.categories = [];

        CategoriesService.getCategories().then(function (response) {
                $scope.$apply(function() {    
                    vm.categories = response;
                });

                if ($routeParams.category)
                    vm.activeCategory = vm.categories.find(c => c.link === $routeParams.category).title;
            }).catch(function (err) {
                console.log(err.statusText);
                alert("The following error occured: " + err.statusText);
            });
    }
})(); 