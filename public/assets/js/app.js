var mainApp = angular.module('mainApp', ['ngRoute']);
var loginApp = angular.module('loginApp', []);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/books', {
            templateUrl: 'assets/js/books/books.htm',
        })
        .when('/books/:bookId', {
            templateUrl: 'assets/js/books/bookDetails.htm',
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

