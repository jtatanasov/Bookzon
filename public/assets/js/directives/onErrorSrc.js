mainApp.directive('onErrorSrc', function () {
    return {
        link: function (scope, element, attrs) {
            //not catching error?
            element.bind('error', function () {
                if (attrs.src != attrs.onErrorSrc) {
                    attrs.$set('src', attrs.onErrorSrc);
                }
            });
        }
    }
});


