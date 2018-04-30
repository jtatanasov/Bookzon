var mainApp = angular.module('mainApp', ['ngRoute','ui.bootstrap']);
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
        })
        .when('/add-book', {
            templateUrl: 'assets/js/admin/addBook.htm',
            controller: 'AdminController',
            controllerAs: 'admin'
        })
        .when('/profile/edit-profile', {
            templateUrl: 'assets/js/profile/editProfile/editProfile.htm',
            controller: 'EditProfileController',
            controllerAs: 'profile',
        })
        .when('/profile/cart', {
            templateUrl: 'assets/js/cart/cart.htm',
            controller: 'CartController',
            controllerAs: 'cartCtrl'
        })
        .otherwise({
            templateUrl: 'assets/js/home/home.htm',
            controller: "HomeController",
            controllerAs: "home"
        });
});
