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
                    $timeout(delay.resolve, 200);
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

mainApp.run(['$rootScope', 'MainService', function ($rootScope, MainService) {
// .run(['$rootScope', function ($rootScope) {
    console.log("app running")
    var id = MainService.isUserLogged();
    if (id) {
        MainService.getUserById(id).then(function (data) {
            console.log(data)
            // if (data == null) {
            //         // $scope.$apply(function () {
                        // $rootScope.loggedUser = false;
            //         // });
                    // return;
                // }
                $rootScope.$apply(function () {
                    $rootScope.user = data.data[0];
                    // $rootScope.user = TestService.getUser();        
                    console.log("usera doide")
                    console.log($rootScope.user)
                });
                // angular.element(document).ready(function() {
                //     angular.bootstrap(document, ['myApp']);
                // })
            })
            .catch(function(err) {
                console.log("err!!!")
                console.log(err)
                // angular.element(document).ready(function() {
                //     angular.bootstrap(document, ['myApp']);
                // })
            });
    }
        // });
    // }
}]);

mainApp.service('TestService', function() {
    this.getUser = function() {
        return "Pesho";
    }
});