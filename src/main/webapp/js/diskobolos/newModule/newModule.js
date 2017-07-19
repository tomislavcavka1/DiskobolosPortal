/* global app */

/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tihomir Cavka
 */
var newModule = angular.module('newModule', []);

newModule.controller('newModuleController',
        function Ctrl($scope, DTOptionsBuilder,
                DTColumnDefBuilder, dataTableUtils) {
            $scope.contacts = [
                {'id': '0' , 'RB' : '1', 'clanice':'clanica 1','sredstva_udruge': '7.000,00', 'sredstva_sportovi':'10.000,00' },
                {'id': '1' , 'RB' : '2', 'clanice':'clanica 2','sredstva_udruge': '6.000,00', 'sredstva_sportovi':'10.000,00' },
                {'id': '2' , 'RB' : '3', 'clanice':'clanica 3','sredstva_udruge': '3.000,00', 'sredstva_sportovi':'10.000,00' },
                {'id': '3' , 'RB' : '4', 'clanice':'clanica 4','sredstva_udruge': '5.000,00', 'sredstva_sportovi':'10.000,00' }
            ];

            $scope.dtOptions = DTOptionsBuilder.newOptions()
                    .withDOM('<"html5buttons"B>lTfgitp')
                    .withLanguage(dataTableUtils.getDataTableTranslations())
                    .withOption('order', [0, 'asc'])
                    .withPaginationType('full_numbers')
                    .withButtons(dataTableUtils.getDataTableButtons([], true))
                    .withOption('select', true)
                    .withOption('responsive', true);

            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1)
            ];

        });


newModule.directive('editInPlace', function () {
    return {
        restrict: 'E',
        scope: {value: '='},
        template: '<span ng-click="edit()" ng-bind="value"></span><input ng-blur="onFocusLost()" ng-model="value"></input>',
        link: function ($scope, element, attrs) {
            // Let's get a reference to the input element, as we'll want to reference it.
            var inputElement = angular.element(element.children()[1]);

            // This directive should have a set class so we can style it.
            element.addClass('edit-in-place');

            // Initially, we're not editing.
            $scope.editing = false;

            // ng-click handler to activate edit-in-place
            $scope.edit = function () {
                $scope.editing = true;

                // We control display through a class on the directive itself. See the CSS.
                element.addClass('active');

                // And we must focus the element. 
                // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
                // we have to reference the first element in the array.
                inputElement[0].focus();
            };
           
            // When we leave the input, we're done editing.
            $scope.onFocusLost = function() {
                $scope.editing = false;
                element.removeClass('active');
            };
        }
    };
});