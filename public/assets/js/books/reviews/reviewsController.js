(function () {
    'use strict';

    mainApp.controller('ReviewsController', ReviewsController);

    function ReviewsController(ReviewsService, BooksService, $filter, $routeParams, $rootScope, $window, $location, $anchorScroll, $timeout, $mdDialog) {
        var vm = this;
        vm.reviews = [];
        vm.review = {
            title: "",
            text: "",
            rating: 1 // rating is required
        };
        vm.review.bookId = $routeParams.bookId;
        vm.bookRating = {
            averageRating: 0,
            ratingsCount: vm.reviews.length
        };
        vm.addReviewCollapsed = true;
        vm.user = {};

        /* get reviews for current book */
        ReviewsService.getBookReviews(vm.review.bookId).then(function (response) {
            vm.reviews = response.data;
            // get logged user review
            if ($rootScope.user) {
                var userReview = vm.reviews.find(r => r.userId == $rootScope.user._id);
                vm.user = $rootScope.user;

                if (userReview) {
                    angular.copy(userReview, vm.review);
                }
            }
            calcAvgRating();
        }).catch(function (err) {
            console.log(err);
        });

        /* Add Review Section */
        /* show/hide ReviewForm */
        vm.toggleReviewForm = function($event) {
            if (!$rootScope.user) {
                console.log("Only logged users can write a review.");
                $window.location.href = "login.html";
                return;
            }

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
            vm.addReviewCollapsed = true;

            if (!$rootScope.user) {
                console.log("Only logged users can write a review.");
                return;
            }

            vm.review.date = $filter('date')(new Date(), 'dd/MMMM/yyyy HH:mm', '+0300');
            vm.review.bookId = $routeParams.bookId;
                
            // add review
            if (!vm.review.userId) {
                vm.review.userId = $rootScope.user._id;
                ReviewsService.addReview(vm.review).then(function(response) {
                    // get user name:
                    response.data.username = $rootScope.user.name;
                    vm.review._id = response.data._id;
                    vm.reviews.push(response.data);
                    calcAvgRating();
                })
                .catch(function(err) {
                    console.log(err);
                });
            } else {
                //edit review
                ReviewsService.editReview(vm.review).then(function(response) {
                    // get user name:
                    response.data.username = $rootScope.user.name;
                    var index = vm.reviews.findIndex(r => r.userId == vm.review.userId);
                    // update review in list
                    vm.reviews[index] = response.data;
                    calcAvgRating();
                })
                .catch(function(err) {
                    console.log(err);
                });
            }
        }

        // delete own review
        vm.deleteReview = function(reviewId) {
            ReviewsService.deleteReview(reviewId, vm.user._id, vm.review.bookId, vm.user.isAdmin)
                .then(resp => {
                    try {
                        var index = vm.reviews.findIndex(r => r._id == reviewId);
                        vm.review = {};
                        vm.review.rating = 1;
                        vm.reviews.splice(index, 1);
                        calcAvgRating();
                    } catch (err) {
                        alert("Error:" + err);
                    }
                })
                .catch(err => {
                    alert("Error:" + err.data.error);
                });
        }

        vm.showConfirm = function(ev, reviewId) {
            // check user
            var confirm = $mdDialog.confirm()
                  .title('Would you like to delete this review?')
                  .targetEvent(ev)
                  .ok('Yes')
                  .cancel('Cancel');
        
            $mdDialog.show(confirm).then(function() {
                vm.deleteReview(reviewId);
            });
        };


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
            if (vm.reviews.length >= 0) {
                var s = vm.reviews.reduce((sum, review) => sum + review.rating, 0);
                vm.bookRating.ratingsCount = vm.reviews.length;
                vm.bookRating.averageRating = vm.bookRating.ratingsCount > 0 ? (s / vm.reviews.length).toFixed(1) : 0;
                
            }
        }
    }
})();