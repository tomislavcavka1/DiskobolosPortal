/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the membership category data.
 * 
 * @author Tihomir Cavka
 */
var sportsBuildingsModule = angular.module('sportsBuildingsModule', []);

sportsBuildingsModule.controller('sportsBuildingsController', function (
        $scope,
        $uibModal,
        DTOptionsBuilder,
        DTColumnDefBuilder,
        $http,
        $rootScope,
        dataTableUtils) {

    $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withLanguage(dataTableUtils.getDataTableTranslations())
            .withOption('order', [0, 'asc'])
            .withPaginationType('full_numbers')
            .withButtons(dataTableUtils.getDataTableButtons([1, 2, 3, 4, 5, 6], true))
            .withOption('select', true)
            .withOption('responsive', true);

    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(-1).withOption('responsivePriority', 1)
    ];

    $scope.$on('selectedSportsBuildings', function (ev, selectedSportsBuildings) {
        $rootScope.selectedSportsBuildings = selectedSportsBuildings;
    });

    $scope.sportBuildings = {};

    $scope.getSportsBuildings = function () {

        $http.get('js/diskobolos/sportsBuildings/sportsBuildings.json').then(function(data) {            
            $scope.sportBuildings = data;
        });
    };

    $scope.editData = function (id) {

        $rootScope.selectedSportsBuildings = _.find($scope.sportBuildings.data, function (obj) {
            return obj.id === id;
        });

        //broadcast selected sportsBuildings
        $rootScope.$broadcast('selectedSportsBuildings', $rootScope.selectedSportsBuildings);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/sportsBuildingsModal.html',
            controller: 'EditSportsBuildingsCtrl',
            scope: $scope
        });

        modalInstance.result.then(function (response) {
            console.log('Modal name', 'sportsBuildingsModal.html');
        });
    };
    
    $scope.getSportsBuildings();

});

sportsBuildingsModule.controller('EditSportsBuildingsCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,
        _,
        AppConstants) {

    $scope.viewMode = AppConstants.ViewMode['readModeOnly'];
    $scope.data = {};
    $scope.data = $rootScope.selectedSportsBuildings;

    $scope.ok = function () {
        
        // TODO: probably we won't need it
       
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
