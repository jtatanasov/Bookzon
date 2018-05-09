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

        this.getCategoryInfo = function(category) {
            var categoryInfo;
            var self = this;
            return new Promise(function(resolve, reject) {
                self.getCategories().then(function() {
                        categoryInfo = categories.find(cat => cat.link.indexOf(category) != -1);
                        resolve(categoryInfo);
                    }).catch(function(err) {
                        reject(err);
                    });
            });
        }
    }
})();