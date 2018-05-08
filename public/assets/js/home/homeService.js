(function () {
    'use strict';
    
    mainApp.service('HomeService', HomeService);

    function HomeService($http) {
   
        this.getTopRatedBooks = function () {
            return $http.get('/api/books/top-rated');
        }
    }
})();