(function () {
    'use strict';

    mainApp.controller('ReviewsController', ReviewsController);

    function ReviewsController(ReviewsService, $filter, $routeParams, $rootScope, $window, $location, $anchorScroll, $timeout) {
        var vm = this;
        vm.reviews = [];
        vm.review = {
            title: "",
            text: "",
            rating: 1 // rating is required
        };
        vm.review.bookId = $routeParams.bookId;
        vm.avgRating = 0;
        vm.addReviewCollapsed = true;

        /* get reviews for current book */
        ReviewsService.getBookReviews(vm.review.bookId).then(function (response) {
            vm.reviews = response.data;
            calcAvgRating();
        }).catch(function (err) {
            console.log(err);
        });

        /* Add Review Section */
        /* show/hide ReviewForm */
        if($rootScope.user) {
            vm.userId = $rootScope.user._id;
        }
        vm.toggleReviewForm = function($event) {
            if (!$rootScope.user) {
                console.log("Only logged users can write a review.");
                $window.location.href = "login.html";
                return;
            }

            // todo: add limit - 1 review per book per user
            $timeout(function() {vm.scrollTo('addReviewBtn')}, 0);
            vm.addReviewCollapsed = !vm.addReviewCollapsed;
            
        }

        /* Rating stars */
        vm.addRating = {
            titles: ["I hate it", "I don't like it", "It's ok", "I like it", "I love it"]
        };

        vm.addRating.hoveringOver = function(value) {
            vm.addRating.overStar = value;
            vm.addRating.percent = 100 * (value / 5);
            vm.addRating.caption = vm.addRating.titles[Number(value) - 1];
        };
        
        vm.addRating.hoveringOut = function() { 
            vm.addRating.overStar = null;
            vm.addRating.caption = null;
        }


        /* submit review */
        vm.addReview = function($event) {
            $event.preventDefault();

            if (!$rootScope.user) {
                console.log("Only logged users can write a review.");
                return;
            }

            vm.review.date = $filter('date')(new Date(), 'dd/MMMM/yyyy HH:mm', '+0300');
            vm.review.userId = $rootScope.user._id;

            ReviewsService.addReview(vm.review).then(function(response) {
                vm.addReviewCollapsed = true;
                // get user name:
                response.data.username = $rootScope.user.name;
                vm.reviews.push(response.data);
                calcAvgRating();
            })
            .catch(function(err) {
                console.log(err);
            });
        }

        // todo: update own review, delete own review

        /* Scroll to Customer Reviews Section */
        vm.scrollTo = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            //reset to old to keep any additional routing logic from kicking in
            $location.hash(old);
        }

        /* calculate book rating */
        function calcAvgRating() {
            if (vm.reviews.length > 0) {
                var s = vm.reviews.reduce((sum, review) => sum + review.rating, 0);
                vm.avgRating = (s / vm.reviews.length).toFixed(1);
            }
        }
    }
})();