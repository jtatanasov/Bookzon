mainApp.directive('categories', function() {
    return {
        templateUrl: 'assets/js/directives/categories/categoriesTemplate.htm',
        restrict: 'E',
        scope: {
            info: '=',
            active: '='
        }
    };
});