var mainApp = angular.module('mainApp', ['ngRoute']);
var loginApp = angular.module('loginApp', []);

mainApp.config(function ($routeProvider) {
    $routeProvider
        // .when('/', {
        //     templateUrl: 'assets/js/home/home.htm',
        //     controller: "HomeController",
        //     controllerAs: "home"
        // })
        .when('/books', {
            templateUrl: 'assets/js/books/books.htm',
        })
        .when('/books/:bookId', {
            templateUrl: 'assets/js/books/bookDetails.htm',
        })
        .when('/profile', {
            templateUrl: 'assets/js/profile/profile.htm',
            controller: 'ProfileController',
            controllerAs: 'profile',
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 100);
                    return delay.promise;
                }
            }
        })
        .when('/profile/edit-profile', {
            templateUrl: 'assets/js/profile/editProfile/editProfile.htm',
            controller: 'EditProfileController',
            controllerAs: 'profile',
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 100);
                    return delay.promise;
                }
            }
        })
        .otherwise({
            templateUrl: 'assets/js/home/home.htm',
            controller: "HomeController",
            controllerAs: "home"
        });
});

