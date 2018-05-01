(function () {
    'use strict';

    mainApp.controller('BookDetailsController', BookDetailsController);

    function BookDetailsController($routeParams, BooksService, CartService, $rootScope, $scope, $location, $anchorScroll) {
        var vm = this;
        var bookId = $routeParams.bookId;
        vm.rating = {};
        vm.isAvailable = true;
        vm.isLogged = false;
        vm.addedToCart = false;


        BooksService.getBookById(bookId).then(function (response) {
            if (!$rootScope.user) {
                vm.isLogged = false;
            } else {
                vm.userId = $rootScope.user._id;
                vm.isLogged = true;
            }

            vm.bookDetails = response.data;
            if (vm.bookDetails.volumeInfo.quantity == 0) {
                vm.isAvailable = false;
            } else {
                vm.isAvailable = true;
            }
            // temporarily using google books averageRating
            // vm.rating.rate = vm.bookDetails.volumeInfo.rating ? vm.bookDetails.volumeInfo.rating : vm.bookDetails.volumeInfo.averageRating;
            // vm.rating.rate = 4;
        }).catch(function (err) {
            console.log(err);
        });

        /* Scroll to Customer Reviews Section */
        vm.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }



        //adding to cart + modal dialog
        vm.addToCart = function () {
            CartService.addToCart(vm.userId, vm.bookDetails)
                .then(resp => {
                    if(resp.data.alreadyInCart) {
                        vm.addedToCart = true;
                    } else {
                        vm.addedToCart = false;
                    }
                    angular.element('#show-modal-dialog').addClass('show');
                    angular.element('#show-modal-dialog').css('display', 'block');
                    angular.element('#show-modal-dialog').css('padding-right', '17px');
                    angular.element('body').addClass('modal-open');
                    angular.element('body').append("<div id='help-div' class='modal-backdrop fade show'></div>");
                })
                .catch(err => {
                    console.log(err);
                })
        }

        function closeModalDialog() {
            angular.element('#show-modal-dialog').removeClass('show');
            angular.element('#show-modal-dialog').css('display', 'none');
            angular.element('#show-modal-dialog').css('padding-right', '17px');
            angular.element('body').removeClass('modal-open');
            angular.element('#help-div').remove();
        }
        vm.closeModal = function () {
            closeModalDialog();
        }
        vm.goToCart = function() {
            closeModalDialog();
            $location.path('/profile/cart');
        }
    }
})(); 