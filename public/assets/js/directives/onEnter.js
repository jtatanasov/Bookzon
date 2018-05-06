// mainApp.directive('myEnter', function () {
//     return function (scope, element, attrs) {
//         element.bind("keydown keypress", function (event) {
//             var keyCode = event.which || event.keyCode;

//             // If enter key is pressed
//             if (keyCode === 13) {
//                 scope.$apply(function() {
//                     console.log(attrs.myEnter)
//                     // Evaluate the expression
//                     scope.$eval(attrs.myEnter);
//                 });

//                 event.preventDefault();
//             }
//         });
//     };
// });

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