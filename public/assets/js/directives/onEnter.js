(function () {
  'use strict'

  mainApp.directive('myEnter', myEnter);

  function myEnter() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind("keypress", function(event) {
          var keyCode = event.which || event.keyCode;

        //   if (keyCode == $attrs.code) {
          if (keyCode == 13) {
            $scope.$apply(function() {
              $scope.$eval($attrs.myEnter, {$event: event});
            });

          }
        });
      }
    };
  }
})();