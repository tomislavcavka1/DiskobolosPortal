/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tihomir Cavka
 */
var newModule = angular.module('newModule', []);

newModule.controller('newModuleController',
        function Ctrl($scope, DTOptionsBuilder,
                DTColumnDefBuilder, dataTableUtils) {
            $scope.model = {
                contacts: [{
                        id: 1,
                        name: "Lorem",
                        number1: 28,
                        number2: 28
                    }, {
                        id: 2,
                        name: "Lorem",
                        number1: 12,
                        number2: 12
                    }, {
                        id: 3,
                        name: "Lorem",
                        number1: 34,
                        number2: 34
                    }, {
                        id: 4,
                        name: "Lorem",
                        number1: 56,
                        number2: 56
                    }],
                selected: {}
            };

            // gets the template to ng-include for a table row / item
            $scope.getTemplate = function (contact) {
                if (contact.id === $scope.model.selected.id)
                    return 'edit';
                else
                    return 'display';
            };

            $scope.editContact = function (contact) {
                $scope.model.selected = angular.copy(contact);
            };

            $scope.saveContact = function (idx) {
                console.log("Saving contact");
                $scope.model.contacts[idx] = angular.copy($scope.model.selected);
                $scope.reset();
            };

            $scope.reset = function () {
                $scope.model.selected = {};
            };

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