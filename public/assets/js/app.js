var mainApp = angular.module('mainApp', ['ngRoute']);
var loginApp = angular.module('loginApp', []);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
        })
        .when('/books', {
            templateUrl: 'assets/js/books/books.htm',
        })
        .otherwise({
            templateUrl: 'assets/js/main/mainTemplate.htm',
            controller: 'MainController'
        });
});

