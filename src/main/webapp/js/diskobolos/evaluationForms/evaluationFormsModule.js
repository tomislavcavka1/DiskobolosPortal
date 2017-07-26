//* global app */

/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tihomir Cavka
 */
var evaluationFormsModule = angular.module('evaluationFormsModule', []);

evaluationFormsModule.controller('evaluationFormsFirstModuleController',
        function Ctrl($scope, DTOptionsBuilder,
                DTColumnDefBuilder, dataTableUtils) {
            $scope.contacts = [
                {'id': '0', 'RB': '1', 'clanice': 'clanica 1', 'sredstva_udruge': '7.000,00', 'sredstva_sportovi': '10.000,00'},
                {'id': '1', 'RB': '2', 'clanice': 'clanica 2', 'sredstva_udruge': '6.000,00', 'sredstva_sportovi': '10.000,00'},
                {'id': '2', 'RB': '3', 'clanice': 'clanica 3', 'sredstva_udruge': '3.000,00', 'sredstva_sportovi': '10.000,00'},
                {'id': '3', 'RB': '4', 'clanice': 'clanica 4', 'sredstva_udruge': '5.000,00', 'sredstva_sportovi': '10.000,00'}
            ];

            $scope.dtOptions = DTOptionsBuilder.newOptions()
                    .withDOM('<"html5buttons"B>lTfgitp')
                    .withLanguage(dataTableUtils.getDataTableTranslations())
                    .withOption('order', [0, 'asc'])
                    .withPaginationType('full_numbers')
                    .withButtons(dataTableUtils.getDataTableButtons([], true))
                    .withOption('responsive', true);

            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1)
            ];

        });

evaluationFormsModule.controller('evaluationFormsSecondtModuleController',
        function Ctrl($scope, DTOptionsBuilder,
                DTColumnDefBuilder, dataTableUtils) {
            $scope.contacts = [
                {'id': '0', 'RB': '1', 'clanice': 'clanica 11', 'sredstva_udruge': '7.000,00', 'sredstva_sportovi': '10.000,00'},
                {'id': '1', 'RB': '2', 'clanice': 'clanica 2', 'sredstva_udruge': '6.000,00', 'sredstva_sportovi': '10.000,00'},
                {'id': '2', 'RB': '3', 'clanice': 'clanica 3', 'sredstva_udruge': '3.000,00', 'sredstva_sportovi': '10.000,00'},
                {'id': '3', 'RB': '4', 'clanice': 'clanica 4', 'sredstva_udruge': '5.000,00', 'sredstva_sportovi': '10.000,00'}
            ];

            $scope.dtOptions = DTOptionsBuilder.newOptions()
                    .withDOM('<"html5buttons"B>lTfgitp')
                    .withLanguage(dataTableUtils.getDataTableTranslations())
                    .withOption('order', [0, 'asc'])
                    .withPaginationType('full_numbers')
                    .withButtons(dataTableUtils.getDataTableButtons([], true))
                    .withOption('responsive', true);

            $scope.dtColumnDefs = [
                DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1)
            ];

        });


