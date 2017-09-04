/* 
 * Event utils
 * 
 * @author Tomislav Čavka
 */
var eventUtilsModule = angular.module('eventUtilsModule', []);

/*
 * The directive binds to the keydown, keypress and keyup events of the element it is attributed to.
 * When the event is received the supplied expression is evaluated inside an $apply block.
 */
eventUtilsModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress keyup", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});
