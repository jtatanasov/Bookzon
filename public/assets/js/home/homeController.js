(function () {
    'use strict'

    mainApp.controller('HomeController', HomeController);

    function HomeController(BooksService) {
        var vm = this;

        vm.message = "hello";
    }
})();
