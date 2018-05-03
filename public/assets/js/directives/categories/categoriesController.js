(function () {
    'use strict';

    mainApp.controller('CategoriesController', CategoriesController);

    function CategoriesController(CategoriesService, $scope, $timeout, $routeParams) {
        var vm = this;
        vm.categories = [];
        // vm.categories = CategoriesService.getCategories();

        CategoriesService.getCategories().then(function (response) {
                vm.categories = response.data;

                if ($routeParams.category)
                    vm.activeCategory = vm.categories.find(c => c.link === $routeParams.category).title;
            }).catch(function (err) {
                console.log(err)
            });

            
        // CategoriesService.loadCategoriesfromJSON().then(function(response) {
        //     $timeout(function () {    
        //         $scope.$apply(function() {
        //             vm.categories = response.data;
        //             console.log(vm.categories)
        //         })
        //     }, 10);
        //     console.log(vm.categories)
        // }, function(err){
        //     console.log(err)
        // });

    }
})(); 