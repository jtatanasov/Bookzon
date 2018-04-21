var mainApp = angular.module('mainApp', ['ngRoute']);
var loginApp = angular.module('loginApp', []);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'login.html',
        })
        .otherwise({
            templateUrl: 'assets/js/main/mainTemplate.htm',
            controller: 'MainController'
        });
});

