/* 
 * Input fields utils
 * 
 * @author Tomislav Čavka
 */
var inputFieldsUtilsModule = angular.module('inputFieldsUtilsModule', []);

inputFieldsUtilsModule.directive('focusMe', function($timeout, $parse) {
  return {
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
      element.bind('blur', function() {
        scope.$apply(model.assign(scope, false));
      });
    }
  };
});




