(function () {
    'use strict';

    mainApp.controller('ReviewsController', ReviewsController);

    function ReviewsController(ReviewsService, $filter, $routeParams, $rootScope, $window) {
        var vm = this;
        vm.reviews = [];
        vm.review = {
            title: "",
            text: ""
        };
        vm.review.bookId = $routeParams.bookId;
        vm.rating = 0;
        vm.isCollapsed = true;

        /* get reviews for current book */
        ReviewsService.getBookReviews(vm.review.bookId).then(function (response) {
            vm.reviews = response.data;
            
            /* calculate book rating */
            if (vm.reviews.length > 0) {
                var s = vm.reviews.reduce((sum, review) => sum + review.rating, 0);
                vm.rating = Math.round(s / vm.reviews.length);
            }
        }).catch(function (err) {
            console.log(err);
        });
        
        /* show/hide ReviewForm */
        vm.toggleReviewForm = function($event) {
            if (!$rootScope.user) {
                console.log("Only logged users can write a review.");
                $window.location.href = "login.html";
                return;
            }

            // todo: add limit - 1 review per book per user
            vm.isCollapsed = !vm.isCollapsed;
        }

        vm.addReview = function($event) {
            $event.preventDefault();

            if (!$rootScope.user) {
                console.log("Only logged users can write a review.");
                return;
            }

            vm.review.date = $filter('date')(new Date(), 'dd/MMMM/yyyy HH:mm', '+0300');
            vm.review.userId = $rootScope.user._id;

            ReviewsService.addReview(vm.review).then(function(response) {
                vm.isCollapsed = true;
                // insert user name
                response.data.username = $rootScope.user.name;
                vm.reviews.push(response.data);
            })
            .catch(function(err) {
                console.log(err);
            });
        }

        // todo: update own review, delete own review
    }
})();