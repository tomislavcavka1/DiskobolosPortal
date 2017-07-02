/* 
 * Color util functions
 * 
 * @author Tomislav Čavka
 */
var colorUtilsModule = angular.module('colorUtilsModule', []);

colorUtilsModule.factory('colorUtils', function() {
  return {
    colorBasedOnPercentageValue: function(value) {
      if(value === 0) {
            return "red-percentage";            
        } else if(value > 0 && value <= 25) {            
            return "orange-percentage";
        } else if(value > 25  && value <= 50) {
            return "yellow-percentage";
        } else if(value > 50  && value <= 75) {
            return "blue-percentage";
        } else {            
            return "green-percentage";
        }
     }
   };
});


