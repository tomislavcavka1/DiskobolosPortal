/*
 * Templates module
 * 
 * @author Tomislav Čavka
 */
var templateModule = angular.module('templateModule', []);

templateModule.directive('navigation', function() {
    return {
        replace: true,
        restrict: 'E',  
        templateUrl: 'views/common/navigation.html'
    };
});


