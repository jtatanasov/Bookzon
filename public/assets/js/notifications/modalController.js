(function () {
    'use strict'

    mainApp.controller('ModalController', ModalController);
    mainApp.controller('ModalInstanceController', ModalInstanceController);

    function ModalController($rootScope, $uibModal, $animate, $log, MainService, CartService) {
        var vm = this;

        vm.open = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl: 'assets/js/notifications/notifications.htm',
                controller: 'ModalInstanceController',
                controllerAs: 'mInstCtrl',
                size: size,
                resolve: {
                    notifications: function () {
                        return vm.notifications;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                vm.selected = selectedItem;
            });
        };

        $rootScope.user = MainService.getLoggedUser();
        if (typeof $rootScope.user != 'undefined' && $rootScope.user != null) {
            vm.loggedUser = true;
            if ($rootScope.user.isAdmin) {
                vm.isAdmin = true;
            } else {
                vm.isAdmin = false;
            }

            notifyUser();
            function notifyUser() {
                MainService.getUserNotifications($rootScope.user._id)
                    .then(resp => {
                        var notifications = resp.data.notifications;
                        if (notifications && notifications.length > 0) {

                            vm.notifications = notifications.filter(n => !n.seen);
                            if (vm.notifications.length > 0) {
                                vm.notifications.forEach(n => {
                                    if (!n.seen) {
                                        CartService.removeBookFromCart($rootScope.user._id, n.bookId);
                                    }
                                })
                                vm.open();
                            } else {

                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

        
    };

    function ModalInstanceController($uibModalInstance, $rootScope, notifications, MainService) {
        var vm = this;
        vm.notifications = notifications;

        vm.seenMessage = function (notificationId) {
            var notIndex = vm.notifications.findIndex(not => not.id == notificationId);
            
            MainService.seenNotification($rootScope.user._id, notificationId)
                .then(resp => {
                    vm.notifications.splice(notIndex, 1);
                    if(vm.notifications.length == 0) {
                        vm.cancel();
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        vm.ok = function () {
            $modalInstance.close();
          };
        vm.cancel = function () {
            $uibModalInstance.close();
        };
    };
})();
