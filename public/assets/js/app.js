var mainApp = angular.module('mainApp', ['ngRoute']);
var loginApp = angular.module('loginApp', []);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/books', {
            templateUrl: 'assets/js/books/books.htm',
        })
        .when('/profile', {
            templateUrl: 'assets/js/profile/profile.htm',
            // controller: 'ProfileController'
        })
        .otherwise({
            templateUrl: 'assets/js/main/main.htm',
            controller: 'MainController'
        });
});

