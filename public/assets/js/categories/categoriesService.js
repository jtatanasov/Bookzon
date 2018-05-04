(function () {
    'use strict';

    mainApp.service('CategoriesService', CategoriesService);

    function CategoriesService($http) {
        var categories;
     
        this.getCategories = function() {
            return new Promise(function(resolve, reject) {
                if (!categories) {
                    $http.get('assets/js/directives/categories/categories.json').then(function(response) {
                            categories = response.data;
                            resolve(categories);
                        }).catch(function(err) {
                            reject(err);
                        });
                } else {
                    resolve(categories);
                }
            });
        }
    }
})();