(function () {
    'use strict';

    mainApp.service('CategoriesService', CategoriesService);

    function CategoriesService($http) {
        var categories = [];
        
        // $http.get('assets/js/directives/categories/categories.json').then(function(response) {
        //     console.log(response.data)
        //     categories = response.data;
        // }).catch(function(err) {
        //     console.log(err);
        // })

        // loadCategoriesFromJSON().then(function(response) {
        //         console.log(response.data)
        //         categories = response.data;
        //     }).catch(function(err) {
        //         console.log(err);
        //     })

        // this.getCategories = function () {
        //     // return categories.slice();
        // }

        // this.loadCategoriesFromJSON = function () {
        //     return $http.get('assets/js/directives/categories/categories.json').then(function(response) {
        //         categories = response.data;
        //         return response.data;
        //     });
        // }
        
       
        function getCategories() {
            return $http.get('assets/js/directives/categories/categories.json');
        }

        return {
            getCategories: getCategories
        }
    }
})();