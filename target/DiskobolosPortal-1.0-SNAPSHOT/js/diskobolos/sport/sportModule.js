/**
 * AngularJS controller responsible for fetching, creation, edit and deletion of the sport data.
 * 
 * @author Tomislav Čavka
 */
var sportModule = angular.module('sportModule', []);

sportModule.controller('sportController', function (
        $scope,
        $rootScope,
        _,
        SportDataFactory,
        $uibModal,
        DTOptionsBuilder) {
            
      $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);
            
      $scope.$on('selectedSport', function (ev, selectedSport) {
           $rootScope.selectedSport = selectedSport;
      });
            
      $scope.sports = {};            
                    
      $scope.getSports = function () {
            
      SportDataFactory.getAllSports({}, function (response) {
                //success
                $scope.sports = response.sports;
                                
                if (_.isArray($scope.sports) && $scope.sports.length > 0) {
                    
                    for (var i = 0; i < $scope.sports.length; i++) {
                        $scope.nomenclatureOfSports = $scope.sports[i].nomenclatureOfSports;
                        
                        $scope.sports[i].nationalSportsFederation = '';
                        $scope.sports[i].internationalFederation = '';
                        $scope.sports[i].iocSportAccord = '';
                        
                        for(var j = 0; j < $scope.nomenclatureOfSports.length; j++) {                                                                               
                            
                            switch ($scope.nomenclatureOfSports[j].category) {                                                           
                                case 'NATIONAL_SPORTS_FEDERATION':
                                        $scope.sports[i].nationalSportsFederation +=  (_.isEmpty($scope.sports[i].nationalSportsFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;                                
                                    break;
                                case 'INTERNATIONAL_FEDERATION':                                                                         
                                        $scope.sports[i].internationalFederation += (_.isEmpty($scope.sports[i].internationalFederation) ? '' : '/') + $scope.nomenclatureOfSports[j].value;                                
                                    break;
                                case 'IOC_SPORTACCORD':
                                        $scope.sports[i].iocSportAccord += (_.isEmpty($scope.sports[i].iocSportAccord) ? '' : '/') + $scope.nomenclatureOfSports[j].value;                              
                                    break;
                                default:                                    
                                    break;
                             }                            
                        }
                    }
                    
                }               
            },
            function (error) {
                //fail
                $scope.error = error;
            });
        };
                
        $scope.editData = function (id) {
            
            $rootScope.selectedSport = _.find($scope.sports, function (obj) {
                return obj.id === id;
            });
            
            //broadcast selected sport
            $rootScope.$broadcast('selectedSport', $rootScope.selectedSport);

            var modalInstance = $uibModal.open({
                templateUrl: 'views/modal_example1.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope
            });
            
            modalInstance.result.then(function (response) {
                console.log('Modal name', 'modal_example1.html');                
            });
        };
                                
        $scope.getSports();
});


sportModule.controller('ModalInstanceCtrl', function (
        $scope,
        $rootScope,
        $uibModalInstance,        
        _) {
              
        $scope.data = {};
        $scope.data.email = $rootScope.selectedSport.name;
		
        $scope.ok = function () {            
            console.log('Email: ' + $scope.data.email);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
});

