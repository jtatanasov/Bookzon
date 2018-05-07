var mainApp = angular.module('mainApp', ['ngRoute','ui.bootstrap','ngMessages','ngAnimate', 'ui.bootstrap.modal', 'ngMaterial']);
var loginApp = angular.module('loginApp', ['ngMessages']);

mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'assets/js/home/home.htm',
            controller: "HomeController",
            controllerAs: "home"
        })
        .when('/books', {
            templateUrl: 'assets/js/books/books.htm',
        })
        .when('/books/search', {
            templateUrl: 'assets/js/books/books.htm',
        })
        .when('/books/category/:category', {
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
        .when('/order', {
            templateUrl: 'assets/js/orders/singleOrder/order.htm',
            controller: 'OrderController',
            controllerAs: 'order'
        })
        .when('/add-book', {
            templateUrl: 'assets/js/admin/addBook.htm',
            controller: 'AdminController',
            controllerAs: 'admin'
        })
        .when('/pending-orders', {
            templateUrl: 'assets/js/admin/pendingOrders.htm',
            controller: 'AdminController',
            controllerAs: 'admin'
        })
        .when('/profile/edit-profile', {
            templateUrl: 'assets/js/profile/editProfile/editProfile.htm',
            controller: 'EditProfileController',
            controllerAs: 'profile',
        })
        .when('/profile/orders', {
            templateUrl: 'assets/js/orders/allOrders/orders.htm',
            controller: 'AllOrdersController',
            controllerAs: 'orders'
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
