(function () {
    'use strict'

    mainApp.controller('MainController', MainController);

    function MainController($scope, $location, $rootScope, MainService, CartService) {
        var vm = this;
        vm.loggedUser = false;
        vm.isAdmin = false;
        vm.notifications = {};

        $rootScope.user = MainService.getLoggedUser();
        if (typeof $rootScope.user != 'undefined' && $rootScope.user != null) {
            vm.loggedUser = true;
            if ($rootScope.user.isAdmin) {
                vm.isAdmin = true;
            } else {
                vm.isAdmin = false;
            }
            // notifyUser();
            // function notifyUser() {
            //     MainService.getUserNotifications($rootScope.user._id)
            //         .then(resp => {
            //             var notifications = resp.data.notifications;
                        
            //             if (notifications && notifications.length > 0) {
            //                 notifications.forEach(n => {
            //                     if (n.seen) {
            //                         console.log(n.bookId);
            //                         CartService.removeBookFromCart($rootScope.user._id, n.bookId);
            //                     }
            //                 })
            //                 console.log(notifications.some(n => !n.seen));
            //                 if (notifications.some(n => !n.seen)) {
            //                     vm.notifications = notifications.filter(n => !n.seen);
            //                     angular.element('#notification-modal-dialog').addClass('show');
            //                     angular.element('#notification-modal-dialog').css('display', 'block');
            //                     angular.element('#notification-modal-dialog').css('padding-right', '17px');
            //                     angular.element('body').addClass('modal-open');
            //                     angular.element('#help-modal-div').addClass('modal-backdrop');
            //                     angular.element('#help-modal-div').addClass('fade');
            //                     angular.element('#help-modal-div').addClass('show');
            //                 } else {
            //                     closeModalDialog();
            //                 }
            //             } else {
            //                 closeModalDialog();
            //             }
            //         })
            //         .catch(err => {
            //             console.log(err);
            //         });
            //     vm.seenMessage = function (notificationId) {
            //         MainService.seenNotification($rootScope.user._id, notificationId)
            //             .then(resp => {
            //                 notifyUser();
            //             })
            //             .catch(err => {
            //                 console.log(err);
            //             })
            //     }
            //     function closeModalDialog() {
            //         angular.element('#notification-modal-dialog').removeClass('show');
            //         angular.element('#notification-modal-dialog').css('display', 'none');
            //         angular.element('#notification-modal-dialog').css('padding-right', '17px');
            //         angular.element('body').removeClass('modal-open');
            //         angular.element('#help-modal-div').removeClass('modal-backdrop');
            //         angular.element('#help-modal-div').removeClass('fade');
            //         angular.element('#help-modal-div').removeClass('show');
            //     }
            //     vm.closeModal = function () {
            //         closeModalDialog();
            //     }
            // }


        }

        //notifications



        //loggedout
        vm.goToLoginPage = function ($event) {
            $event.preventDefault();
            location.replace('login.html')
        }
        vm.goToSignUpPage = function ($event) {
            $event.preventDefault();
            location.replace('login.html#toregister')
        }


        //logedin
        vm.goToProfilePage = function ($event) {
            $event.preventDefault();
            $location.path('/profile');
        }

        vm.goToCart = function ($event) {
            $event.preventDefault();
            $location.path('/profile/cart');
        }

        vm.goToOrders = function ($event) {
            $event.preventDefault();
            $location.path('/profile/orders');
        }
        vm.logOut = function ($event) {
            $event.preventDefault();
            MainService.logout()
                .then(r => {
                    $rootScope.user = null;
                    vm.loggedUser = false;
                    vm.isASdmin = false;
                    $location.path('');
                })
                .catch(err => {
                    console.log(err);
                })
        }

        //admin

        vm.addNewBook = function ($event) {
            $event.preventDefault();
            $location.path('/add-book');
        }
    }
})();