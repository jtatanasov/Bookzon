(function () {
    'use strict';

    mainApp.service('ReviewsService', ReviewsService);

    function ReviewsService($http) {
        // var reviews;
        
        this.getBookReviews = function (bookId) {
            return $http.get('/api/reviews/' + bookId);
        }

        this.getReviewById = function (reviewId) {
            return $http.get('/api/reviews/review/' + reviewId);
        }


        this.addReview = function (data) {
            return $http({
                url: '/api/reviews',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });
        }

        this.editReview = function (review) {
            return $http({
                url: '/api/reviews/review/' + review._id,
                method: 'PUT',
                contentType: 'application/json',
                data: angular.toJson(review)
            });
        }

        this.deleteReview = function(reviewId, userId, bookId, isAdmin) {
            return $http.delete('/api/reviews/review/' + reviewId + '/' + userId + '/' + bookId + '/' + isAdmin)
        }
    }
})();